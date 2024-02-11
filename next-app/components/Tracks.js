"use client";

import React from "react";
import styled from "styled-components";
import Track from "./Track";
import Tabs from "./Tabs";

const Wrapper = styled.div`
  background: linear-gradient(
    to bottom,
    ${(props) => props.$bgColor} 50%,
    transparent 100%
  );
  width: 20%;
  overflow: hidden;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (max-width: 641px) {
    width: 100%;
    position: relative;
  }
  @media (min-width: 641px) and (max-width: 1024px) {
    width: 50%;
  }
`;

const Ul = styled.ul`
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
  color: ${(props) => props.fontColor};
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

const Img = styled.img`
  object-fit: contain;
  margin-left: 50%;
  transform: translateX(-50%);
  zoom: 1.2;
  padding: 0;
  display: block;
  height: 300px;
  overflow: hidden;
  // position: relative;
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.9) 70%,
    transparent 100%
  );
  @media only screen and (max-width: 768px) {
    zoom: 1.65;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    zoom: 1.8;
  }
  @media only screen and (min-width: 2000px) {
    zoom: 2;
  }
`;

const Credit = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  opacity: 0.8;
  border-radius: 5px;
  color: grey;
  font-size: 0.7rem;
  text-align: center;
  padding: 3px 3px;

  position: absolute;
  bottom: 0;
  @media only screen and (max-width: 700px) {
    align-items: center;
    bottom: 0;
    opacity: 0.8;
    color: grey;
    position: absolute;
    z-index: 5;
    background-color: white;
    padding: 0.5px 3px;
  }
`;

const Figure = styled.figure`
  // margin: 0 auto;
`;

export default function Tracks({
  tracks,
  color,
  image,
  title,
  latest,
  credit,
  year,
}) {
  const fixedTracks = tracks.filter((track) => track.status.type === "fixed");
  const unplayedTracks = tracks.filter(
    (track) => track.status.type === "unplayed"
  );
  const surpriseTracks = tracks.filter(
    (track) => track.status.type === "surprise"
  );
  let specialTracks = tracks.filter((track) => track.status.type === "special");

  if (year === 2024) {
    specialTracks = [];
  }

  return (
    <Wrapper $bgColor={color.background}>
      <Tabs
        children={[
          {
            name: "Surprise",
            content: SurpriseTracks({
              surpriseTracks,
              specialTracks,
              TracksList,
            }),
          },
          {
            name: "Fixed",
            content: FixedTracks({ fixedTracks, TracksList }),
          },
          {
            name: "Unplayed",
            content: UnplayedTracks({ unplayedTracks, TracksList }),
          },
        ]}
      />
      <Figure>
        <Img src={image} alt={title}></Img>
        <Credit>{credit}</Credit>
      </Figure>
    </Wrapper>
  );

  function TracksList(i, track) {
    return (
      <Li key={i} fontColor={color.default}>
        <Track track={track} color={color} latest={latest} />
      </Li>
    );
  }
}

function SurpriseTracks({ surpriseTracks, specialTracks, TracksList }) {
  return surpriseTracks.length > 0 ? (
    <Ul>
      {surpriseTracks.map((track, i) => {
        return TracksList(i, track);
      })}
      {specialTracks.map((track, i) => {
        return TracksList(i, track);
      })}
    </Ul>
  ) : (
    <Ul>
      <p>No 2024 surprise tracks yet.</p>
    </Ul>
  );
}


function FixedTracks({ fixedTracks, TracksList }) {
  return fixedTracks.length > 0 ? (
    <Ul>
      {fixedTracks.map((track, i) => {
        return TracksList(i, track);
      })}
    </Ul>
  ) : (
    <Ul>
      <p>No fixed tracks</p>
    </Ul>
  );
}
function UnplayedTracks({ unplayedTracks, TracksList }) {
  return (
    <Ul>
      {unplayedTracks.map((track, i) => {
        return TracksList(i, track);
      })}
    </Ul>
  );
}
