import { z } from "zod";
import * as R from "ramda";
import parseDate from "../utils/parseDate";

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
  video: string | null;
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
type ConcertInfo = {
  date: string;
  venue: Venue;
};
type Track = z.infer<typeof trackSchema>;
type Status =
  | { type: "fixed" }
  | {
      type: "surprise";
      latest: boolean;
      concertInfo: Array<ConcertInfo>;
      instrument: Array<Instrument>;
      info: Array<Info>;
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
  instrument: Instrument;
  info: Info;
  latest: boolean;
  mashup: boolean;
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
        return parseDate(concert.eventDate).getFullYear() === year;
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
        return {
          concertInfo: {
            date: concert.eventDate,
            venue: concert.venue,
          },
          instrument: instrument(song.info),
          info: song.info ?? "",
          mashup:
            (song.info?.includes("mashup") ||
              song.info?.includes("contains elements")) ??
            false,
          latest: concert.latest ?? false,
          ...song,
        };
      });
  });
  return allSongPlays;
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
    const latest = R.any((play) => play.latest, plays);
    const concertInfo = plays.map((play) => {
      return play.concertInfo;
    });
    const info = plays.map((play) => play.info);
    const instrument = plays.map((play) => play.instrument);
    return {
      type: "surprise",
      latest,
      info,
      concertInfo,
      instrument,
    };
  } else {
    return {
      type: "unplayed",
    };
  }
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
  const mashups = allSongPlays.filter((play) => play.mashup);
  const mashupTracks = mashups.map((mashup) => {
    if (mashup.name === "Getaway Car") {
      mashup.name = "getaway car / august / the other side of the door";
    }
    if (mashup.name === "Come Back… Be Here") {
      mashup.name = "Come Back… Be Here / Daylight";
    }
    return {
      title: mashup.name,
      id: Math.random(),
      status: {
        type: "surprise",
        latest: mashup.latest,
        mashup: true,
        concertInfo: [mashup.concertInfo],
        instrument: [mashup.instrument],
        info: [mashup.info],
      } as Status,
      video: null,
    };
  });

  console.log(mashupTracks);

  const playsByName = indexPlaysByName(allSongPlays);

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
            video: track.video || null,
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
