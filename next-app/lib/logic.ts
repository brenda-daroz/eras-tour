import { z } from "zod";
import * as R from "ramda";
import parseDate from "../utils/parseDate";

const venueSchema = z.object({
  name: z.string(),
  city: z.object({ name: z.string(), country: z.object({ code: z.string() }) }),
});

const songSchema = z.object({ name: z.string(), info: z.string().optional() });

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
    }
  | { type: "unplayed" };
type Song = z.infer<typeof songSchema>;
type Concert = z.infer<typeof concertSchema>;
type Instrument = "guitar" | "piano";

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
  latest: boolean;
} & Song;

const indexSongPlays = ({
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

  console.log(concertsWithLatest);

  const allSongPlays: Play[] = concertsWithLatest.flatMap((concert) => {
    return concert.sets.set
      .flatMap((set) => set.song)
      .map((song) => {
        return {
          concertInfo: {
            date: concert.eventDate,
            venue: concert.venue,
          },
          instrument: instrument(song.info),
          latest: concert.latest ?? false,
          ...song,
        };
      });
  });
  console.log(
    allSongPlays.filter((song) => song.name.toLowerCase() === "nothing new")
  );
  return R.groupBy((song) => song.name.toLowerCase(), allSongPlays);
};

function status({
  track,
  allSongPlays,
}: {
  track: Track;
  allSongPlays: Partial<Record<string, Array<Play>>>;
}): Status {
  if (track.fixed) {
    return {
      type: "fixed",
    };
  }
  const plays = allSongPlays[track.title.toLowerCase()];
  if (plays && plays.length > 0) {
    const latest = R.any((play) => play.latest, plays);
    const concertInfo = plays.map((play) => {
      return play.concertInfo;
    });
    const instrument = plays.map((play) => play.instrument);
    return {
      type: "surprise",
      latest,
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
  const allSongPlays = indexSongPlays({ setlistResponse, year });
  return discography.albums
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
            status: status({ track, allSongPlays }),
            video: track.video || null,
          };
        }),
      };
    });
};
