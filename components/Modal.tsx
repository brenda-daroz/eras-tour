import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { UITrack } from "@/lib/logic";

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
    width: 80%;
    flex-direction: column;
    padding: 10px;
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
  height: 100%;
  max-width: 400px;
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
  width: 100%;
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
  width: 80%;
  border-radius: 10px;
`;

type ModalProps = {
  onClose: () => void;
  track: UITrack;
};

function videoEmbedUrl(track: UITrack) {
  const regex = /video\/(\d+)/;
  const match = track.video ? track.video.match(regex) : "";
  if (match) {
    return `https://www.tiktok.com/embed/v2/${match[1]}`;
  }
}

const Modal = ({ onClose, track }: ModalProps) => {
  const url = videoEmbedUrl(track);

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

            {track.status.type === "surprise" &&
              track.status.concertInfo.map((info, i) => {
                return (
                  <>
                    <ModalCard key={i}>
                      {track.status.type === "surprise" &&
                      track.status.concertInfo.length > 1 ? (
                        <p style={{ margin: "0 0 4px 0" }} key={i}>
                          Day {track.status.concertInfo.length - i}
                        </p>
                      ) : null}
                      <ModalText key={i}>Date: {info.date}</ModalText>
                      <ModalText key={i}>Venue: {info.venue.name}</ModalText>
                      <ModalText key={i}>
                        Location: {info.venue.city.name} -
                        {info.venue.city.country.code}
                      </ModalText>
                      <ModalText>
                        <strong>
                          Info: {track.status.type === "surprise" &&
                            track.status.info[i]}
                        </strong>
                      </ModalText>
                    </ModalCard>
                  </>
                );
              })}
          </ModalInfo>
          <>
            {track.video && (
              <div
                style={{
                  height: "700px",
                  position: "sticky",
                  top: "0",
                  margin: "0 auto",
                }}
              >
                <Video src={url} title={track.title}></Video>
              </div>
            )}
          </>
        </Wrapper>
      </ModalDiv>
    </>
  );
};

export default Modal;
