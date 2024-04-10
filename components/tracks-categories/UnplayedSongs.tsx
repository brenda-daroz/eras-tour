import React, { ComponentProps } from "react";
import { Ul, TrackListItem } from "./SurpriseSongs";
import { UITrack } from "@/lib/logic";

type UnplayedTracksProps = {
  unplayedTracks: Array<UITrack>;
  color: ComponentProps<typeof TrackListItem>["color"];
};

export function UnplayedTracks({ unplayedTracks, color }: UnplayedTracksProps) {
  return (
    <Ul>
      {unplayedTracks.map((track, i) => {
        return TrackListItem({ i, track, color });
      })}
    </Ul>
  );
}
