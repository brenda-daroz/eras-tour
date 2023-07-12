import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import memoizee from 'memoizee';

let cache = null;

const PORT = 3000;
const app = express();
const SETLIST_API_KEY = process.env.SETLIST_API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
const corsOptions = {
  // origin: "http://localhost:3001"
  origin: "https://eras-tour.brenda.fyi"
};

function url(pageNumber) {
  return `https://api.setlist.fm/rest/1.0/search/setlists?artistMbid=20244d07-534f-4eff-b4d4-930878889970&p=${pageNumber}&tourName=eras%20tour`;
}

async function fetchSetlist(pageNumber) {
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'x-api-key': SETLIST_API_KEY
    }
  }
  const response = await fetch(url(pageNumber), fetchOptions);
  if (response.status >= 400) {
    throw new Error(response.statusText);
  } else {
    return response.json();
  }
}

app.get('/data', cors(corsOptions), async (req, res) => {
  console.info("Request received /data")
  try {
    const setlistData = await readFromCache();
    // console.log(setlistData)
    const discography = await readDiscography();
    const response = combine(allSongs(setlistData.setlist), surpriseSongs(setlistData.setlist), discography);
    res.json(response);
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error.message });
  }
})


function parseDate(eventDate) {
  const [d, m, y] = eventDate.split("-")
  const monthNum = parseInt(m) - 1
  return new Date(y, monthNum, d)
}

function formatDate(date) {
  const [d, m, y] = date.split("-")
  const monthNum = parseInt(m) - 1
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"][monthNum]
  return month + " " + ordinal(d) + ", " + y
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function enrichSong(concert) {
  const info = {
    date: formatDate(concert.eventDate),
    venue: concert.venue
  }

  return concert.sets.set.map(set => {
    return {
      ...set, song: set.song.map(song => {
        return { ...song, concertInfo: info }
      })
    }
  })

}
function surpriseSongs(setlist) {

  const sets = setlist
    .filter(concert => concert.sets)
    .toSorted((a, b) => parseDate(a.eventDate) - parseDate(b.eventDate))
    .map(concert => enrichSong(concert))
    .filter(sets => sets.length > 0)
    .map(sets => sets.filter((set) => set.name?.includes("Surprise") || set.name?.includes("Taylor Swift (Debut)")).map(set => set.song).flat())
    .map(songs => songs.map(song => { return { ...song, name: song.name.toLowerCase() } }))
  const latestSong = [...sets.slice(0, sets.length - 1), sets[sets.length - 1].map(song => {
    return {
      ...song,
      latest: true,
    }
  })]
  const songs = latestSong.flat()
  // console.log(songs)
  return songs
}

function allSongs(setlist) {
  const sets = setlist
    .filter(concert => concert.sets)
    .toSorted((a, b) => parseDate(a.eventDate) - parseDate(b.eventDate))
    .map(concert => enrichSong(concert))
    .filter(sets => sets.length > 0)

    .map(sets => sets.filter((set) => set.name?.includes("")).map(set => set.song).flat())
    .map(songs => songs.map(song => { return { ...song, name: song.name.toLowerCase() } }))
  // .map(sets => sets.sets.set.map(set => set.song).flat())
  // .map(set => set.song)
  // .map(songs => songs.map(song => { return { ...song, name: song.name.toLowerCase() } }))
  // console.log(sets.flat())
  return sets.flat()
}


const status = (track, surpriseSongs, allSongs) => {
  if (track.fixed) {
    return {
      type: "fixed"
    }
  } else if (surpriseSongs.find((song) => song.name === track.title.toLowerCase())) {
    return {
      type: "surprise",
      latest: surpriseSongs.find((song) => song.name === track.title.toLowerCase()).latest,
      concertInfo: surpriseSongs.find((song) => song.name === track.title.toLowerCase()).concertInfo
    }
  } else if (track.special) {
    return {
      type: "special",
      concertInfo: allSongs.find((song) => {
        return song.name === track.title.toLowerCase()
      }).concertInfo
    }
  } else {
    return {
      type: "unplayed"
    }
  }
}

const combine = (allSongs, surpriseSongs, discography) => {
  // console.log(discography)
  return discography.albums.toSorted((a, b) => a.year - b.year).map(album => {
    return {
      id: album.id,
      color: {
        background: album.color.background,
        textFixed: album.color.fixed,
        textSurprise: album.color.special
      },
      cover: album.cover,
      coverCredit: album.coverCredit,
      tracks: album.tracks.map(track => {

        return {
          id: track.id,
          title: track.title,
          status: status(track, surpriseSongs, allSongs),
          video: track.video

        }
      })
    }
  })
}

async function readDiscography() {
  const filePath = path.join(__dirname, 'ts-discography.json');
  return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function fetchPages(pageNumber = 1) {
  console.log("making request", pageNumber)
  const response = await fetchSetlist(pageNumber);
  // console.log(response)

  if (response.itemsPerPage * response.page < response.total) {
    await sleep(300)
    const nextPage = await fetchPages(pageNumber + 1)

    return { setlist: response.setlist.concat(nextPage.setlist) }
  } else {

    return response;
  }
}

// const fetchPagesMemoized = memoizee(fetchPages, { promise: true, maxAge: 1000 * 60 * 60 * 4 })

const fillCache = async () => {
  cache = await fetchPages();
  console.info("Cache refreshed successfully")
};

const readFromCache = async () => {
  if (cache) {
    console.info("Cache hit")
  } else {
    console.info("Cache miss")
    try {
      await fillCache()
    } catch (error) {
      throw new Error("Cache not ready", { cause: error })
    }
  }
  return cache
}

setInterval(() => {
  console.info("Refreshing cache")
  try {
    fillCache()
  } catch (error) {
    console.error("Error refreshing cache", error)
  }
}, 1000 * 60 * 60 * 4);


fillCache();

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
