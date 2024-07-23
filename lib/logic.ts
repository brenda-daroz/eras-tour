import { z } from "zod";
import * as R from "ramda";
import parseDate from "../utils/parseDate";
import { videoURLs } from "./videoUrlsMashup";

const venueSchema = z.object({
  name: z.string(),
  city: z.object({ name: z.string(), country: z.object({ code: z.string() }) }),
});

const songSchema = z.object({
  name: z.string(),
  info: z.string().optional(),
  tape: z.boolean().optional(),
});

const setSchema = z.object({
  name: z.string().optional(),
  song: z.array(songSchema),
});

const concertSchema = z.object({
  eventDate: z.string(),
  venue: venueSchema,
  sets: z.object({ set: z.array(setSchema) }),
});

export const setlistResponseSchema = z.object({
  setlist: z.array(concertSchema),
});

const trackSchema = z.object({
  id: z.number(),
  title: z.string(),
  video: z.string().optional(),
  fixed: z.boolean().optional(),
});

const albumSchema = z.object({
  id: z.number(),
  year: z.number(),
  title: z.string(),
  color: z.object({
    background: z.string(),
    special: z.string(),
    fixed: z.string(),
  }),
  cover: z.string(),
  coverCredit: z.string(),
  tracks: z.array(trackSchema),
});
export const discographySchema = z.object({
  albums: z.array(albumSchema),
});

export type UITrack = {
  id: number;
  title: string;
  status: Status;
  // video: string | null;
};

export type UIAlbum = {
  id: number;
  color: { background: string; textFixed: string; textSurprise: string };
  cover: string;
  title: string;
  coverCredit: string;
  tracks: Array<UITrack>;
};

export type UIDataOutput = Array<UIAlbum>;

type Discography = z.infer<typeof discographySchema>;
export type SetlistResponse = z.infer<typeof setlistResponseSchema>;

type Venue = z.infer<typeof venueSchema>;
export type ConcertInfo = {
  latest: boolean;
  date: string;
  venue: Venue;
  instrument: Instrument;
  info: Info;
  mashup: boolean;
  video: string | null;
};
type Track = z.infer<typeof trackSchema>;
type Status =
  | { type: "fixed" }
  | {
      type: "surprise";
      latest: boolean;
      concertInfo: Array<ConcertInfo>;
    }
  | { type: "unplayed" };
type Song = z.infer<typeof songSchema>;
type Concert = z.infer<typeof concertSchema>;
type Instrument = "guitar" | "piano";
export type Info = Array<string> | string;

const instrument = (info: Song["info"]): Instrument => {
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
      if (info?.match(piano)) {
        return "piano";
      }
      return "guitar";
  }
};

type Play = {
  concertInfo: ConcertInfo;
} & Song;

const computeAllSongsPlays = ({
  setlistResponse,
  year,
}: {
  setlistResponse: SetlistResponse;
  year?: number;
}) => {
  const concerts = year
    ? setlistResponse.setlist.filter((concert) => {
        return (
          parseDate(concert.eventDate).getFullYear() === year &&
          concert.sets.set.length > 0
        );
      })
    : setlistResponse.setlist;

  const concertsWithLatest = R.adjust<Concert & { latest?: boolean }>(
    0,
    R.assoc("latest", true),
    concerts.sort((a, b) => {
      return (
        parseDate(b.eventDate).getTime() - parseDate(a.eventDate).getTime()
      );
    })
  );

  const allSongPlays: Play[] = concertsWithLatest.flatMap((concert) => {
    return concert.sets.set
      .flatMap((set) => set.song)
      .filter((song) => !song.tape)
      .map((song) => {
        const infoLowerCase = song.info?.toLowerCase() ?? "";
        const isMashup =
          infoLowerCase.includes("mashup") ||
          infoLowerCase.includes("elements") ||
          infoLowerCase.includes("clara bow") ||
          infoLowerCase.includes("high infidelity") ||
          infoLowerCase.includes("out of the woods");

        return {
          concertInfo: {
            date: concert.eventDate,
            venue: concert.venue,
            mashup: isMashup,
            instrument: instrument(song.info),
            info: song.info ?? "",
            latest: concert.latest ?? false,
            video: null,
          },
          ...song,
        };
      });
  });
  const sortedSongPlays = R.sortBy(
    (play) => new Date(play.concertInfo.date).getTime(),
    allSongPlays
  );

  console.log("sorted", sortedSongPlays);

  return sortedSongPlays;
};

const indexPlaysByName = (songPlays: Play[]) => {
  return R.groupBy((song) => song.name.toLowerCase(), songPlays);
};

function status({
  track,
  playsByName,
}: {
  track: Track;
  playsByName: Partial<Record<string, Array<Play>>>;
}): Status {
  if (track.fixed) {
    return {
      type: "fixed",
    };
  }
  const plays = playsByName[track.title.toLowerCase()];
  if (plays?.length) {
    const latest = R.any((play) => play.concertInfo.latest, plays);
    const concertInfo = plays.map((play) => ({
      date: play.concertInfo.date,
      venue: play.concertInfo.venue,
      instrument: play.concertInfo.instrument,
      info: play.concertInfo.info,
      latest: play.concertInfo.latest,
      mashup: play.concertInfo.mashup,
      video: play.concertInfo.video || track.video || null,
    }));
    return {
      type: "surprise",
      latest,
      concertInfo,
    };
  } else {
    return {
      type: "unplayed",
    };
  }
}

function extractQuotedStrings(input: string): string[] {
  const regex = /"([^"]*)"/g;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(input)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

export const computeUIData = ({
  discography,
  setlistResponse,
  year,
}: {
  discography: Discography;
  setlistResponse: SetlistResponse;
  year?: number;
}): UIDataOutput => {
  const allSongPlays = computeAllSongsPlays({ setlistResponse, year });
  const mashups = allSongPlays.filter((play) => play.concertInfo.mashup);
  const mashupTracks = mashups.map((mashup) => {
    if (
      mashup.name === "Is It Over Now?" &&
      mashup.concertInfo.date === "25-02-2024"
    ) {
      mashup.name = "is it over now? / I Wish You Would";
    }
    if (
      mashup.name === "Getaway Car" &&
      mashup.concertInfo.date === "17-02-2024"
    ) {
      mashup.name = "getaway car / august / the other side of the door";
    }
    if (
      mashup.name === "Death by a Thousand Cuts" &&
      mashup.concertInfo.date === "07-03-2024"
    ) {
      mashup.name = "Death by a Thousand Cuts / Babe";
    }
    if (
      mashup.name === "Come Back… Be Here" &&
      mashup.concertInfo.date === "18-02-2024"
    ) {
      mashup.name = "Come Back… Be Here / Daylight";
    }
    if (
      mashup.name === "The Black Dog" &&
      mashup.concertInfo.date === "21-06-2024"
    ) {
      mashup.name = "The Black Dog / Come Back… Be Here / Maroon";
    }
    if (
      mashup.name === "Is It Over Now?" &&
      mashup.concertInfo.date === "11-11-2023"
    ) {
      mashup.name = "Is It Over Now? / Out of the woods";
    }

    const allSongs = discography.albums.flatMap((album) =>
      album.tracks.map((track) => track.title.toLowerCase())
    );

    const mashedUpSongNames = extractQuotedStrings(
      mashup.concertInfo.info as string
    ).filter((song) => allSongs.includes(song.toLowerCase()));

    const name = mashup.name + " / " + mashedUpSongNames.join(" / ");

    function cleanSongNames(songNames: string): string {
      const nameArray = songNames.split(" / ");
      const uniqueNames = Array.from(
        new Set(nameArray.map((name) => name.trim()))
      );
      return uniqueNames.filter(Boolean).join(" / ");
    }

    const updatedName = cleanSongNames(name);
    mashup.name = updatedName;

    const dateStr = mashup.concertInfo.date.split("T")[0];
    const key = `${updatedName}_${dateStr}`;
    console.log("key", key);
    const videoUrl = videoURLs[key] || null;
    mashup.concertInfo.video = videoUrl;

    return {
      title: updatedName,
      id: Math.random(),
      status: {
        type: "surprise",
        latest: mashup.concertInfo.latest,
        concertInfo: [mashup.concertInfo],
      } as Status,
    };
  });

  const separatedMashupPlays = mashups.flatMap((mashup) => {
    const mashedUpSongNames = mashup.name.split(" / ");
    return mashedUpSongNames.map((name) => ({
      name,
      type: "surprise",
      concertInfo: mashup.concertInfo,
      latest: mashup.concertInfo.latest,
    }));
  });

  const combinedSongs = [
    ...separatedMashupPlays,
    ...allSongPlays.filter((play) => !play.concertInfo.mashup),
  ];

  const playsByName = indexPlaysByName(combinedSongs);

  const discographyAlbums = discography.albums
    .sort((a, b) => a.year - b.year)
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
            status: status({ track, playsByName }),
          };
        }),
      };
    });
  return R.adjust(
    -1,
    (mashupAlbum) => {
      return {
        ...mashupAlbum,
        tracks: mashupTracks,
      };
    },
    discographyAlbums
  );
};
