import styled from "styled-components";
import React, { ComponentProps } from "react";
import Track from "../Track";
import { UITrack } from "@/lib/logic";

export const Ul = styled.ul`
  padding-top: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: fit-content;
  padding: 0 10px;
  margin: 20px auto;
  height: 80%;
  justify-content: center;
`;

const Li = styled.li`
  list-style: none;
  font-weight: 500;
  line-height: 1.8;
  font-size: 0.75rem;
  text-align: center;
  text-decoration: dotted;
  @media only screen and (max-width: 768px) {
    font-size: 1rem;
  }
  @media only screen and (min-width: 1600px) and (max-width: 2000px) {
    font-size: 1.1rem;
    line-height: 2;
  }
  @media only screen and (min-width: 2000px) {
    font-size: 1.4rem;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.4rem;
  }
`;

type TrackListItemProps = {
  i: React.Key;
  track: UITrack;
  color: ComponentProps<typeof Track>["color"];
};

export function TrackListItem({ i, track, color }: TrackListItemProps) {
  return (
    <Li key={i}>
      <Track track={track} color={color} />
    </Li>
  );
}

type SurpriseTracksProps = {
  surpriseTracks: Array<UITrack>;
  specialTracks: Array<UITrack>;
  color: TrackListItemProps["color"];
};

export function SurpriseTracks({
  surpriseTracks,
  specialTracks,
  color,
}: SurpriseTracksProps) {
  return surpriseTracks.length > 0 ? (
    <Ul>
      {surpriseTracks.map((track, i) => {
        return TrackListItem({ i, track, color });
      })}
      {specialTracks.map((track, i) => {
        return TrackListItem({ i, track, color });
      })}
    </Ul>
  ) : (
    <Ul>
      <p>No surprise tracks yet.</p>
    </Ul>
  );
}
