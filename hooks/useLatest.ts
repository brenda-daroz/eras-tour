// useLatestSurpriseTracks.ts
import { useMemo } from "react";
import { UITrack } from "@/lib/logic";

export const useLatestSurpriseTracks = (tracks: UITrack[]): UITrack[] => {
  return useMemo(() => {
    return tracks.filter((track) =>
      track.status.type === "surprise" && track.status.latest ? track : null
    );
  }, [tracks]);
};
