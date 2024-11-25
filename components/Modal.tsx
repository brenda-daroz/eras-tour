import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ConcertInfo, UITrack } from "@/lib/logic";
import parseDate from "@/utils/parseDate";
import Tabs from "./Tabs";

const DarkBg = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalDiv = styled.div`
  position: fixed;
  display: flex;
  align-items: start;
  justify-content: space-evenly;
  gap: 10px;
  overflow-y: auto;
  max-height: 85vh;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  top: 50%;
  left: 50%;
  z-index: 11;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  @media only screen and (max-width: 641px) {
    flex-direction: column;
    padding: 5px 10px;
  }
  @media (min-width: 641px) and (max-width: 1024px) {
    width: 85%;
    height: 75%;
  }
  @media only screen and (min-width: 2000px) {
    width: 40%;
    height: 55%;
  }
`;

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  // height: 100%;
  // max-width: 400px;
  text-align: center;
  padding: 10px 0px;
  @media only screen and (max-width: 641px) {
    min-height: fit-content;
    width: 100%;
    margin-top: 1rem;
  }
`;

const ModalText = styled.p`
  font-size: 0.9rem;
  text-align: center;
  padding: 0 5px;
  margin: 0;
  @media only screen and (min-width: 2000px) {
    font-size: 1.2rem;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1rem;
  text-align: center;
  padding: 0 5px;
  margin: 0;
  text-transform: uppercase;
  @media only screen and (min-width: 2000px) {
    font-size: 1.4rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  display: block;
  background-color: transparent;
  border: none;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  margin: 2px;
  &:hover {
    color: #eaaed0;
    transition: 0.3s ease-out;
  }
  @media only screen and (max-width: 641px) {
    right: 5px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  @media only screen and (max-width: 641px) {
    position: relative;
    max-height: inherit;
    flex-direction: column;
  }
`;

const Video = styled.iframe`
  width: fit-content;
  height: 100%;
  border: none;
  border-radius: 5px;
  margin: 0 auto;
  @media only screen and (max-width: 641px) {
    height: inherit;
  }
`;

const ModalCard = styled.div`
  background-color: #ebebeb;
  padding: 10px;
  width: 300px;
  height: fit-content;
  border-radius: 10px;
  @media only screen and (max-width: 641px) {
    width: 240px;
    align-self: center;
  }
`;

const ModalTab = styled.div`
  display: flex;
  gap: 20px;
  @media only screen and (max-width: 641px) {
    flex-direction: column;
    padding: 0 15px;
  }
`;

type ModalProps = {
  onClose: () => void;
  track: UITrack;
};

function videoEmbedUrl(videoUrl: string | null): string | undefined {
  if (videoUrl) {
    const regex = /video\/(\d+)/;
    const match = videoUrl.match(regex);
    if (match) {
      return `https://www.tiktok.com/embed/v2/${match[1]}`;
    }
  }
  return undefined;
}

const Modal = ({ onClose, track }: ModalProps) => {
  const sortedConcertInfo =
    track.status.type === "surprise" &&
    (track.status.concertInfo.slice().sort((b, a) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateB.getTime() - dateA.getTime();
    }) as ConcertInfo[]);

  const tabs =
    sortedConcertInfo &&
    sortedConcertInfo.map((info, i) => {
      const videoUrl = videoEmbedUrl(info.video);

      return {
        name: info.venue.city.name,
        content: (
          <ModalTab key={i}>
            <ModalCard>
              <ModalText>Date: {info.date}</ModalText>
              <ModalText>Venue: {info.venue.name}</ModalText>
              <ModalText>
                Location: {info.venue.city.name} -{" "}
                {info.venue.city.country.code}
              </ModalText>
              <ModalText>
                <strong>Info: {info.info}</strong>
              </ModalText>
            </ModalCard>
            {videoUrl && (
              <div
                style={{
                  height: "700px",
                  position: "sticky",
                  top: "0",
                  margin: "0 auto",
                }}
              >
                <Video src={videoUrl} title={track.title}></Video>
              </div>
            )}
          </ModalTab>
        ),
      };
    });

  return (
    <>
      <DarkBg onClick={onClose}></DarkBg>
      <ModalDiv onClick={(e) => e.stopPropagation()}>
        <Wrapper>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </CloseButton>
          <ModalInfo>
            <ModalTitle>{track.title}</ModalTitle>

            {track.status.type === "surprise" && tabs && tabs.length > 1 ? (
              <Tabs tabs={tabs} customTabStyles="opacity: 100; font-size: 0.8rem; padding: 5px 10px" layout="mobile"/>
              
            ) : (
              tabs && tabs[0]?.content
            )}
          </ModalInfo>
        </Wrapper>
      </ModalDiv>
    </>
  );
};

export default Modal;
