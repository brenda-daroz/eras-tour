import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";

const CompletedDiv = styled.div`{
cursor: ${props => (props.fixed || props.unplayed ? "default" : "pointer")};
color: ${props => (props.special ? props.specialColor : props.fixed ? props.fixedColor : "#547873")};
text-decoration: ${props => (props.special ? "underline dotted" : "none")};
text-transform: uppercase;
}`

const Latest = styled.div`
  color: red;
  font-size: 0.7rem;
  background: #f3f6f4;
  border-radius: 5px;
  padding: 0 5px;
  font-weight: 500;
  text-transform: uppercase;
  `
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  `

const Track = ({ track, color }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen])

  const completeTrack = <CompletedDiv
    id={track.id}
    name="track"
    value={track.id}
    onClick={handleClick}
    special={track.status.type === "surprise" || track.status.type === "special"}
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
      {(track.status.type === "surprise" || track.status.type === "special") && isOpen ? < Modal setIsOpen={setIsOpen} track={track} /> : null}

    </>
  );



};

export default Track;
