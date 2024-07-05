import { useMemo } from "react";
import { UITrack } from "@/lib/logic";

export const useLatestSurpriseTracks = (tracks: UITrack[]): UITrack[] => {
  const latestMashup = tracks.filter(
    (track) =>
      track.status.type === "surprise" &&
      track.status.concertInfo.some(
        (item) => item.latest === true && item.mashup === true
      ) &&
      track.title.includes(" / ")
  );

  const latestSurpriseTracks = tracks.filter(
    (track) =>
      track.status.type === "surprise" &&
      track.status.concertInfo.some(
        (item) => item.latest === true && item.mashup === false
      )
  );

  console.log("latestSurpriseTracks", latestSurpriseTracks);

  const combinedTracks = [...latestMashup, ...latestSurpriseTracks];

  const uniqueTitles = Array.from(
    new Set(combinedTracks.map((track) => track.title))
  );

  const uniqueTracks = uniqueTitles
    .map((title) => combinedTracks.find((track) => track.title === title))
    .filter((track): track is UITrack => track !== undefined);

  return useMemo(() => uniqueTracks, [tracks]);
};
