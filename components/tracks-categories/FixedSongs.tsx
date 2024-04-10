import React, { ComponentProps } from "react";
import { Ul, TrackListItem } from "./SurpriseSongs";
import { UITrack } from "@/lib/logic";

type FixedTracksProps = {
  fixedTracks: Array<UITrack>;
  color: ComponentProps<typeof TrackListItem>["color"];
};

export function FixedTracks({ fixedTracks, color }: FixedTracksProps) {
  return fixedTracks.length > 0 ? (
    <Ul>
      {fixedTracks.map((track, i) => {
        return TrackListItem({ i, track, color });
      })}
    </Ul>
  ) : (
    <Ul>
      <p>No fixed tracks</p>
    </Ul>
  );
}
