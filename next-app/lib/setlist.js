import { discography } from '../discography.js';


let cache = null;
const SETLIST_API_KEY = process.env.SETLIST_API_KEY;

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
    console.info("Fetched setlist data from API")
    return response.json();
  }
}

export async function fazTudo() {
  // throw new Error("fazTudo is deprecated. Use readFromCache instead")
  // console.log("fazTudo")
  const setlistData = await readFromCache();
  // console.log(typeof setlistData.setlist)
  const readDiscography = await discography;
  // console.log(discographyData)
  const response = combine(allSongs(setlistData.setlist), surpriseSongs(setlistData.setlist), readDiscography);
  return response;
}

export default async function handler(req, res) {
  console.info("Request received /data")
  try {
    const setlistData = await readFromCache();
    // console.log(typeof setlistData.setlist)
    const readDiscography = await discography;
    // console.log(discographyData)
    const response = combine(allSongs(setlistData.setlist), surpriseSongs(setlistData.setlist), readDiscography);
    res.json(response);
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: error.message });
  }

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

function surpriseSongs(setlist) {
  // console.log(setlist[0])
  const sets = setlist
    .filter(concert => concert.sets)
    .sort((a, b) => parseDate(a.eventDate) - parseDate(b.eventDate))
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
  // console.log(setlist)
  // console.log(Object.prototype.toString.call(setlist) == '[object Array]')
  const sets = setlist
    .filter(concert => concert.sets)
    .sort((a, b) => parseDate(a.eventDate) - parseDate(b.eventDate))
    .map(concert => enrichSong(concert))
    .filter(sets => sets.length > 0)

    .map(sets => sets.filter((set) => set.name?.includes("")).map(set => set.song).flat())
    .map(songs => songs.map(song => { return { ...song, name: song.name.toLowerCase() } }))
  // // // .map(sets => sets.sets.set.map(set => set.song).flat())
  // // .map(set => set.song)
  // // .map(songs => songs.map(song => { return { ...song, name: song.name.toLowerCase() } }))
  // // console.log(sets.flat())
  // console.log(sets, typeof sets)
  return sets.flat()
}

function surpriseSong(surpriseSongs, track) {
  const songs = surpriseSongs.filter((song) => {
    return song.name.includes(track.title.toLowerCase())
  })
    return songs
}


const status = (track, surpriseSongs, allSongs) => {
  if (track.fixed) {
    return {
      type: "fixed"
    }
  } else if (surpriseSongs.find((song) => song.name === track.title.toLowerCase())) {
    // console.log(track.title, surpriseSong(surpriseSongs, track).map(x => x.concertInfo))
    const songs = surpriseSong(surpriseSongs, track)
    return {
      type: "surprise",
      latest: songs.find(x => x.latest) || false,
      concertInfo: songs.map(x => x.concertInfo)
    }
  } else if (track.special) {
    return {
      type: "special",
      concertInfo: [allSongs.find((song) => {
        return song.name === track.title.toLowerCase()
      }).concertInfo]
    }
  } else {
    return {
      type: "unplayed"
    }
  }
}

const combine = (allSongs, surpriseSongs, discography) => {
  // console.log(Object.prototype.toString.call(discography.albums) == '[object Array]')
  // console.log(discography.albums)
  return discography.albums.sort((a, b) => { a.year - b.year }).map(album => {
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
          video: track.video || null

        }
      })
    }
  })
}


async function fetchPages(pageNumber = 1) {
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

const fillCache = async () => {
  console.info("Refreshing cache")
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
  console.info("Timebased refreshing cache")
  try {
    fillCache()
  } catch (error) {
    console.error("Error refreshing cache", error)
  }
}, 1000 * 60 * 60);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
