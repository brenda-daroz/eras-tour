import { discography } from "../discography.js";
import parseDate from "../utils/parseDate.js";
import formatDate from "../utils/formatDate.js";
import sleep from "../utils/sleep.js";
import fs from "fs";
import { computeUIData } from "@/lib/logic.ts";
import { discographySchema, setlistResponseSchema } from "@/lib/logic.ts";

let cache = null;
const SETLIST_API_KEY = process.env.SETLIST_API_KEY;

function url(pageNumber) {
  return `https://api.setlist.fm/rest/1.0/search/setlists?artistMbid=20244d07-534f-4eff-b4d4-930878889970&p=${pageNumber}&tourName=eras%20tour`;
}

async function fetchSetlist(pageNumber) {
  const fetchOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-api-key": SETLIST_API_KEY,
    },
  };
  console.info(
    Math.floor(Date.now() / 1000) + "Fetching page " + pageNumber + " from API"
  );
  const response = await fetch(url(pageNumber), fetchOptions);
  if (response.status >= 400) {
    console.error(
      Math.floor(Date.now() / 1000) +
        "Error fetching page " +
        pageNumber +
        " from API"
    );
    throw new Error(response.statusText);
  } else {
    console.info(
      Math.floor(Date.now() / 1000) +
        "Success fetching page " +
        pageNumber +
        " from API"
    );
    return response.json();
  }
}

export async function fazTudo(year = null) {
  const setlistData = await readFromCache();
  const readDiscography = await discography;
  // const response = combine(
  //   allSongs(setlistData.setlist),
  //   surpriseSongs(setlistData.setlist, year),
  //   readDiscography
  // );
  const response = computeUIData({discography: discographySchema.parse(readDiscography), setlistResponse: setlistResponseSchema.parse(setlistData), year: year})
  return response;
}

export default async function handler(req, res) {
  console.info("Request received /data");
  try {
    const setlistData = await readFromCache();
    const readDiscography = await discography;
    const response = combine(
      allSongs(setlistData.setlist),
      surpriseSongs(setlistData.setlist),
      readDiscography
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

function enrichSong(concert) {
  const info = {
    date: formatDate(concert.eventDate),
    venue: concert.venue,
  };

  return concert.sets.set.map((set) => {
    return {
      ...set,
      song: set.song.map((song) => {
        return { ...song, concertInfo: info };
      }),
    };
  });
}

function surpriseSongs(setlist, year) {
  let sets = setlist.filter((concert) => concert.sets);

  if (year !== null) {
    sets = sets.filter((concert) => {
      const concertYear = parseDate(concert.eventDate).getFullYear();
      return concertYear === year;
    });
  }

  sets = sets
    .sort((a, b) => parseDate(a.eventDate) - parseDate(b.eventDate))
    .map((concert) => enrichSong(concert))
    .filter((sets) => sets.length > 0)
    .map((sets) =>
      sets
        .filter(
          (set) =>
            set.name?.includes("Surprise") ||
            set.name?.includes("Suprise") ||
            set.name?.includes("Taylor Swift (Debut)")
        )
        .map((set) => set.song)
        .flat()
    )
    .map((songs) =>
      songs.map((song) => {
        return { ...song, name: song.name.toLowerCase() };
      })
    );

  const latestSong = [
    ...sets.slice(0, sets.length - 1),
    sets[sets.length - 1].map((song) => ({
      ...song,
      latest: true,
    })),
  ];

  const songs = latestSong.flat();
  return songs;
}

function allSongs(setlist) {
  const sets = setlist
    .filter((concert) => concert.sets)
    .sort((a, b) => parseDate(a.eventDate) - parseDate(b.eventDate))
    .map((concert) => enrichSong(concert))
    .filter((sets) => sets.length > 0)

    .map((sets) =>
      sets
        .filter((set) => set.name?.includes(""))
        .map((set) => set.song)
        .flat()
    )
    .map((songs) =>
      songs.map((song) => {
        return { ...song, name: song.name.toLowerCase() };
      })
    );

  return sets.flat();
}

function surpriseSong(surpriseSongs, track) {
  const songs = surpriseSongs.filter((song) => {
    return song.name.includes(track.title.toLowerCase());
  });
  return songs;
}

const renderInstrument = (info) => {
  const piano = /(piano)/g;

  switch (info) {
    case "acoustic":
      return "piano";
    case "live debut; acoustic":
      return "guitar";
    case "tour debut; acoustic":
      return "guitar";
    case "tour debut":
      return "piano";
    default:
      if (info.match(piano)) {
        return "piano";
      }
      return "guitar";
  }
};

const status = (track, surpriseSongs, allSongs) => {
  if (track.fixed) {
    return {
      type: "fixed",
    };
  } else if (
    surpriseSongs.find((song) => song.name === track.title.toLowerCase())
  ) {
    const songs = surpriseSong(surpriseSongs, track);
    return {
      type: "surprise",
      latest: songs.find((x) => x.latest) || false,
      concertInfo: songs.map((x) => x.concertInfo),
      instrument: songs.map((song) => renderInstrument(song.info)),
    };
  } else if (track.special) {
    return {
      type: "special",
      concertInfo: [
        allSongs.find((song) => {
          return song.name === track.title.toLowerCase();
        }).concertInfo,
      ],
    };
  } else {
    return {
      type: "unplayed",
    };
  }
};

const combine = (allSongs, surpriseSongs, discography) => {
  return discography.albums
    .sort((a, b) => {
      a.year - b.year;
    })
    .map((album) => {
      return {
        id: album.id,
        color: {
          background: album.color.background,
          textFixed: album.color.fixed,
          textSurprise: album.color.special,
        },
        cover: album.cover,
        title: album.title,
        coverCredit: album.coverCredit,
        tracks: album.tracks.map((track) => {
          return {
            id: track.id,
            title: track.title,
            status: status(track, surpriseSongs, allSongs),
            video: track.video || null,
          };
        }),
      };
    });
};

async function fetchPages(pageNumber = 1) {
  await sleep(1000);
  const response = await fetchSetlist(pageNumber);
  if (response.itemsPerPage * response.page < response.total) {
    await sleep(1000);
    const nextPage = await fetchPages(pageNumber + 1);

    return { setlist: response.setlist.concat(nextPage.setlist) };
  } else {
    return response;
  }
}

const fillCache = async () => {
  console.info("Refreshing cache");
  cache = await fetchPages();
  console.info("Cache refreshed successfully");
  fs.writeFileSync("cache.json", JSON.stringify(cache));
};

const readFromCache = async () => {
  if (cache) {
    console.info("Cache hit");
  } else {
    console.info("Cache miss");
    try {
      await fillCache();
    } catch (error) {
      console.log(error);
      throw new Error("Cache not ready", { cause: error });
    }
  }
  return cache;
};

setInterval(() => {
  console.info("Timebased refreshing cache");
  try {
    fillCache();
  } catch (error) {
    console.error("Error refreshing cache", error);
  }
}, 1000 * 60 * 11);
