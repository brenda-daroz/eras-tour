"use client"

import styled from 'styled-components'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const DarkBg = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ModalDiv = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  overflow: scroll;
  height: 85vh;
  background-color: white;
  border-radius: 10px;
  width: 50%;
  padding: 10px 10px;
  top: 50%;
  left: 50%;
  z-index: 11;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  @media only screen and (max-width: 641px) {
    width: 80%;
    flex-direction: column;
  }
  @media (min-width:641px) and (max-width: 1024px) {
    width: 65%;
    height: 55%;
  }
  @media only screen and (min-width: 2000px) {
    width: 40%;
    height: 55%;
  }
`

const ModalInfo = styled.div`
  display: flex;
  // background-color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100%;
  width: 50%;
  padding: 10px 10px;
  @media only screen and (max-width: 700px) {
    gap: 5px;
    height: fit-content;
    width: 100%;
  }
`
const ModalText = styled.p`
  font-size: 0.9rem;
  text-align: center;
  padding: 0 5px;
  margin: 0;
  @media only screen and (min-width: 2000px) {
    font-size: 1.2rem;
  }
`

const ModalTtitle = styled.h3`
  font-size: 1rem;
  text-align: center;
  padding: 0 5px;
  margin: 0;
  text-transform: uppercase;
  @media only screen and (min-width: 2000px) {
    font-size: 1.4rem;
  }
`


const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  display: block;
  background-color: transparent;
  // border-radius: 50%;
  border: none;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  margin: 2px;
  &:hover {
    color: #EAAED0;
    transition: 0.3s ease-out;
  }
  @media only screen and (max-width: 700px) {
    right: 5px;

  }
`

const Video = styled.iframe`
  width: fit-content;
  height: 100%;
  border: none;
  border-radius: 5px;
  margin: 0 auto ;
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`

const ModalCard = styled.div`
  background-color: #ebebeb;
  padding: 10px;
  width: 70%;
  border-radius: 10px;
`



const Modal = ({ setIsOpen, track }) => {
  const regex = /video\/(\d+)/;
  const match = track.video ? track.video.match(regex) : "";
  const url = `https://www.tiktok.com/embed/v2/${match[1]}`;


  return (
    <>
      <DarkBg onClick={() => setIsOpen(false)}>
      </DarkBg>
      <ModalDiv onclick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faXmark} /></CloseButton>
        <ModalInfo>
          <ModalTtitle>{track.title}</ModalTtitle>

          {track.status.concertInfo.map((info, i) => {
            return (

              <ModalCard>
              {track.status.concertInfo.length > 1 ? <p style={{margin: "0 0 4px 0"}} key={i}>Day {i+1}</p> : null}
              <ModalText key={i}>Date: {info.date}</ModalText>
              <ModalText key={i}>Venue: {info.venue.name}</ModalText>
              <ModalText key={i}>Location: {info.venue.city.name} - {info.venue.city.country.code}</ModalText>
              <ModalText>{track.status.instrument?.[0] === "piano" ? "🎹" : "🎸"}</ModalText>
              </ModalCard>
            )
          }
          )}


        </ModalInfo>
        <>
          {(track.video) ? <Video src={url} frameBorder="0" title="dasd"></Video> : null}
        </>

      </ModalDiv>

    </>
  )
}

export default Modal;
