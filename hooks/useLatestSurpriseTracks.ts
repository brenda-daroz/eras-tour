// useLatestSurpriseTracks.ts
import { useMemo } from "react";
import { UITrack } from "@/lib/logic";

export const useLatestSurpriseTracks = (tracks: UITrack[]): UITrack[] => {
  const latestMashup = tracks.filter(
    (track) =>
      track.status.type === "surprise" &&
      track.status.latest &&
      track.status.mashup &&
      track.title.includes(" / ")
  );

  if (latestMashup.length > 0) {
    return latestMashup;
  }

  const latestSurpriseTracks = tracks.filter(
    (track) =>
      track.status.type === "surprise" &&
      track.status.latest &&
      !track.status.mashup
  );

  return useMemo(() => latestSurpriseTracks, [tracks]);
};
