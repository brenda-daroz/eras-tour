import React from "react";
import styled from "styled-components";
import Tabs from "./Tabs";
import { SurpriseTracks } from "./tracks-categories/SurpriseSongs";
import { FixedTracks } from "./tracks-categories/FixedSongs";
import { UnplayedTracks } from "./tracks-categories/UnplayedSongs";
import { UIAlbum, UITrack } from "@/lib/logic";

const Wrapper = styled.div<{ $bgColor: string }>`
  background: linear-gradient(
    to bottom,
    ${(props) => props.$bgColor} 50%,
    transparent 100%
  );
  width: 25%;
  overflow: hidden;
  min-height: 100vh;
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

const Figure = styled.figure`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  zoom: 1.2;
  height: 300px;
  overflow: hidden;
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

export default function Tracks({
  tracks,
  color,
  cover,
  title,
  coverCredit,
}: UIAlbum) {
  const fixedTracks = tracks.filter((track) => track.status.type === "fixed");
  const unplayedTracks = tracks.filter(
    (track) => track.status.type === "unplayed"
  );
  const surpriseTracks = tracks.filter(
    (track) => track.status.type === "surprise"
  );

  const specialTracks: Array<UITrack> = [];

  return (
    <Wrapper $bgColor={color.background}>
      <Tabs
        tabs={[
          {
            name: "Surprise",
            content: SurpriseTracks({
              surpriseTracks,
              specialTracks,
              color,
            }),
          },
          {
            name: "Fixed",
            content: FixedTracks({ fixedTracks, color }),
          },
          {
            name: "Unplayed",
            content: UnplayedTracks({ unplayedTracks, color }),
          },
        ]}
      />

      <Figure>
        <Img
          src={`https://raw.githubusercontent.com/brenda-daroz/eras-tour/main/public${cover}`}
          alt={title}
        ></Img>
        <div
          style={{
            fontSize: "28px",
            position: "absolute",
            bottom: "20px",
            textAlign: "center",
            color: "#3a3b3c",
          }}
        >
          {title.toUpperCase()}
        </div>
        <Credit>{coverCredit ? coverCredit : null}</Credit>
      </Figure>
    </Wrapper>
  );
}
