import { useLatestSurpriseTracks } from "@/hooks/useLatestSurpriseTracks";
import { UITrack } from "@/lib/logic";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";

const Latest = styled.div``;
const LatestContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-weight: 700;
`;

export function LastPlayedSurpriseSongs({ data }: { data: UITrack[] }) {
  const { isOpen, selectedTrack, openModal, closeModal } = useModal();
  const latestSurpriseTracks = useLatestSurpriseTracks(data);
  const latest = latestSurpriseTracks.map((track) => track.title);

  console.log(latest);

  return (
    <>
      {latestSurpriseTracks.length > 0 && (
        <LatestContainer>
          <Latest>
            <h2>Last played surprise songs:</h2>
            <div>
              {latestSurpriseTracks.map((item, index) => (
                <div key={index} onClick={() => openModal(item)}>
                  {item.status.type === "surprise"
                    ? item.status.instrument?.[0] === "piano"
                      ? "🎹"
                      : "🎸"
                    : null}
                  {"  "} - {item.title}
                </div>
              ))}
            </div>
          </Latest>
        </LatestContainer>
      )}
      {isOpen && selectedTrack && (
        <Modal onClose={closeModal} track={selectedTrack} />
      )}
    </>
  );
}
