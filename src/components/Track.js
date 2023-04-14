import React from "react";
import styled from "styled-components";


const CompletedDiv = styled.div`
cursor: pointer;
text-decoration: ${props => props.completed ? "line-through" : ""};
`

const Track = ({ track, handleToggle }) => {

  const handleClick = (e) => {
    e.preventDefault()
    handleToggle(e.currentTarget.id)
  }
  return (
    <CompletedDiv
      id={track.id}
      name="track"
      value={track.id}
      onClick={handleClick}
      completed={track.complete}
    >
      {track.title}
    </CompletedDiv>
  );
};

export default Track;
