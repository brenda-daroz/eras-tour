import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const CompletedDiv = styled.div`{
cursor: ${props => (props.fixed || props.unplayed ? "default" : "pointer")};
color: ${props => (props.special ? props.specialColor : props.fixed ? props.fixedColor : "#547873")};
text-decoration: ${props => (props.special ? "underline dotted" : "none")};

}`

// const CompleteTrack = styled.div`{
//   text-decoration: ${props => (props.special ? "underline dotted" : "none")};
// }`

const Latest = styled.div`
  color: red;
  font-size: 0.6rem;
  background: #f3f6f4;
  border-radius: 5px;
  padding: 0 5px;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration-style: none !important;
  `
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  `

const Track = ({ track, handleToggle, color }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault()

    setIsOpen(true)
  }

  const completeTrack = <CompletedDiv
    id={track.id}
    name="track"
    value={track.id}
    onClick={handleClick}
    special={track.status.type === "surprise"}
    specialColor={color.textSurprise}
    fixed={track.status.type === "fixed"}
    unplayed={track.status.type === "unplayed"}
    fixedColor={color.textFixed}
  >
    {track.title}
  </CompletedDiv>;

  return (
    <>
      {(track.status.latest) ? <Div>{completeTrack}<Latest>Latest</Latest></Div> : <>{completeTrack}</>}
      {track.status.type === "surprise" && isOpen ? < Modal setIsOpen={setIsOpen} track={track} /> : null}

    </>
  );



};

export default Track;
