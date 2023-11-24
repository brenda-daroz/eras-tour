"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const CompletedDiv = styled.div`
  cursor: ${(props) =>
    props.$fixed || props.$unplayed ? "default" : "pointer"};
  color: ${(props) =>
    props.$special
      ? props.$specialColor
      : props.$fixed
      ? props.$fixedColor
      : "#547873"};
  text-decoration: ${(props) => (props.$special ? "underline dotted" : "none")};
  -webkit-text-decoration: ${(props) =>
    props.$special ? "underline dotted" : "none"};
  text-transform: uppercase;
`;

const Latest = styled.div`
  color: red;
  font-size: 0.7rem;
  background-color: #fcf7f8;
  border-radius: 5px;
  padding: 0 5px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
`;

const Sup = styled.sup`
  font-size: 0.7rem;
  color: ${(props) => props.$specialColor};
  font-weight: 700;
  @media only screen and (min-width: 1600px) {
    font-size: 0.8rem;
  }
  @media only screen and (min-width: 2000px) {
    font-size: 1rem;
  }
`;
const SupDiv = styled.div`
  display: flex;
  gap: 2px;
`;

const Track = ({ track, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const numberOfPlays = track.status.concertInfo?.length;
  const instrument = track.status.instrument;

  const completeTrack = (
    <CompletedDiv
      id={track.id}
      name="track"
      value={track.id}
      onClick={handleClick}
      $special={
        track.status.type === "surprise" || track.status.type === "special"
      }
      $specialColor={color.textSurprise}
      $fixed={track.status.type === "fixed"}
      $unplayed={track.status.type === "unplayed"}
      $fixedColor={color.textFixed}
    >
      {track.status.type === "surprise"
        ? instrument?.[0] === "piano"
          ? "🎹"
          : "🎸"
        : null}{" "}
      {track.title}
    </CompletedDiv>
  );

  return (
    <>
      {track.status.latest &&
      track.status.type === "surprise" &&
      numberOfPlays > 1 ? (
        <Div>
          <SupDiv>
            {completeTrack}
            <Sup $specialColor={color.textSurprise}>{numberOfPlays}</Sup>
          </SupDiv>
          <Latest>Latest</Latest>
        </Div>
      ) : track.status.latest ? (
        <Div>
          {completeTrack}
          <Latest>Latest</Latest>
        </Div>
      ) : track.status.type === "surprise" && numberOfPlays > 1 ? (
        <SupDiv>
          {completeTrack}
          <Sup $specialColor={color.textSurprise}>{numberOfPlays}</Sup>
        </SupDiv>
      ) : (
        <>{completeTrack}</>
      )}

      {(track.status.type === "surprise" || track.status.type === "special") &&
      isOpen ? (
        <Modal setIsOpen={setIsOpen} track={track} />
      ) : null}
    </>
  );
};

export default Track;
