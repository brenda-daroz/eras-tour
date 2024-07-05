"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { UITrack } from "@/lib/logic";
import { useModal } from "@/hooks/useModal";

const TrackDetails = styled.div<{
  $color: string;
  $clickable: boolean;
}>`
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
  color: ${(props) => props.$color};
  text-decoration: ${(props) =>
    props.$clickable ? "underline dotted" : "none"};
  -webkit-text-decoration: ${(props) =>
    props.$clickable ? "underline dotted" : "none"};
  text-transform: uppercase;
`;

const Latest = styled.div`
  color: red;
  font-size: 0.65rem;
  background-color: #fcf7f8;
  border-radius: 5px;
  padding: 0 5px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;
const LatestContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
`;

const Sup = styled.sup<{ $color: string }>`
  font-size: 0.7rem;
  color: ${(props) => props.$color};
  font-weight: 700;
  @media only screen and (min-width: 1600px) {
    font-size: 0.8rem;
  }
  @media only screen and (min-width: 2000px) {
    font-size: 1rem;
  }
`;
const SupContainer = styled.div`
  display: flex;
  gap: 2px;
`;

type TrackProps = {
  track: UITrack;
  color: {
    textSurprise: string;
    textFixed: string;
  };
};

const Track = ({ track, color }: TrackProps) => {
  const { isOpen, selectedTrack, openModal, closeModal } = useModal();

  const numberOfPlays =
    track.status.type === "surprise" ? track.status.concertInfo.length : 0;
  const instrument =
    track.status.type === "surprise"
      ? track.status.concertInfo.map((item) => item.instrument)
      : null;

  const trackDetails = (
    <TrackDetails
      onClick={() => openModal(track)}
      $color={
        track.status.type === "surprise"
          ? color.textSurprise
          : track.status.type === "fixed"
          ? color.textFixed
          : "#547873"
      }
      $clickable={track.status.type === "surprise"}
    >
      {track.status.type === "surprise"
        ? instrument?.[0] === "piano"
          ? "🎹"
          : "🎸"
        : null}
      {track.title}
    </TrackDetails>
  );

  return (
    <>
      {track.status.type === "surprise" &&
      track.status.latest &&
      numberOfPlays > 1 ? (
        <LatestContainer>
          <SupContainer>
            {trackDetails}
            <Sup $color={color.textSurprise}>{numberOfPlays}</Sup>
          </SupContainer>
          <Latest>Latest</Latest>
        </LatestContainer>
      ) : track.status.type === "surprise" && track.status.latest ? (
        <LatestContainer>
          {trackDetails}
          <Latest>Latest</Latest>
        </LatestContainer>
      ) : numberOfPlays > 1 ? (
        <SupContainer>
          {trackDetails}
          <Sup $color={color.textSurprise}>{numberOfPlays}</Sup>
        </SupContainer>
      ) : (
        <>{trackDetails}</>
      )}

      {isOpen && selectedTrack && (
        <Modal onClose={closeModal} track={selectedTrack} />
      )}
    </>
  );
};

export default Track;
