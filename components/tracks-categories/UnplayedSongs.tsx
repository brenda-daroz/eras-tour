import React, { ComponentProps } from "react";
import { Ul, TrackListItem } from "./SurpriseSongs";
import { UITrack } from "@/lib/logic";
import styled from "styled-components";

type UnplayedTracksProps = {
  unplayedTracks: Array<UITrack>;
  color: ComponentProps<typeof TrackListItem>["color"];
};

const Message = styled.div`
  font-size: 2.5rem;
  text-align: center;
`;

export function UnplayedTracks({ unplayedTracks, color }: UnplayedTracksProps) {
  return (
    <div>
      {unplayedTracks.length > 0 ? (
        <Ul>
          {unplayedTracks.map((track, i) => (
            <TrackListItem key={i} i={i} track={track} color={color} />
          ))}
        </Ul>
      ) : (
        <Message>🎉</Message>
      )}
    </div>
  );
}
