import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import memoizee from 'memoizee';


const PORT = 3000;
const app = express();
const SETLIST_API_KEY = process.env.SETLIST_API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
const corsOptions = {
  // origin: "http://localhost:3000"
  origin: "https://solitary-fire-5581.fly.dev"
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
  try {
    const setlistData = await fetchPagesMemoized();
    const discography = await readDiscography();
    const response = combine(surpriseSongs(setlistData.setlist), discography);
    res.json(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
})

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', async (req, res) => {
  console.log(path.join(__dirname, 'public/index.html'))
  res.sendFile(path.join(__dirname, 'public/index.html'))
})


function parseDate(eventDate) {
  const [d, m, y] = eventDate.split("-")
  return new Date(y, parseInt(m) - 1, d)
}

function surpriseSongs(setlist) {

  const sets = setlist
    .filter(concert => concert.sets)
    .toSorted((a, b) => parseDate(a.eventDate) - parseDate(b.eventDate))
    .map(concert => concert.sets.set)
    .filter(sets => sets.length > 0)
    .map(sets => sets.find((set) => set.name?.includes("Surprise")).song)
    .map(songs => songs.map(song => { return { name: song.name.toLowerCase() } }))

  const x = [...sets.slice(0, sets.length - 1), sets[sets.length - 1].map(song => { return { name: song.name, latest: true } })]
  const songs = x.flat()
  console.log(songs.length)
  songs.push({ name: "tim mcgraw" })

  return songs
}

const status = (track, surpriseSongs) => {
  if (track.fixed) {
    return {
      type: "fixed"
    }
  } else if (surpriseSongs.find((song) => song.name === track.title.toLowerCase())) {
    return {
      type: "surprise",
      latest: surpriseSongs.find((song) => song.name === track.title.toLowerCase()).latest
    }
  } else {
    return {
      type: "unplayed"
    }
  }
}

const combine = (surpriseSongs, discography) => {
  return discography.albums.toSorted((a, b) => a.year - b.year).map(album => {
    return {
      id: album.id,
      color: {
        background: album.color.background,
        textFixed: album.color.fixed,
        textSurprise: album.color.special
      },
      cover: album.cover,
      tracks: album.tracks.map(track => {

        return {
          id: track.id,
          title: track.title,
          status: status(track, surpriseSongs)
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
  const response = await fetchSetlist(pageNumber);
  // console.log(response)

  if (response.itemsPerPage * response.page < response.total) {
    await sleep(100)
    const nextPage = await fetchPages(pageNumber + 1)

    return { setlist: response.setlist.concat(nextPage.setlist) }
  } else {

    return response;
  }
}

const fetchPagesMemoized = memoizee(fetchPages, { promise: true, maxAge: 1000 * 60 * 60 })

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
