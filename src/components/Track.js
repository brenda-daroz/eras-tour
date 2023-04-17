import React from "react";
import styled from "styled-components";



const CompletedDiv = styled.div`{
cursor: pointer;
color: ${props => props.complete ? props.completeColor : props.defaultColor}
}`




const Track = ({ track, handleToggle, color }) => {

  const handleClick = (e) => {
    e.preventDefault()
    handleToggle(e.currentTarget.id)
  }
  return (
    <>
      <CompletedDiv
        id={track.id}
        name="track"
        value={track.id}
        onClick={handleClick}
        complete={track.complete}
        defaultColor={color.default}
        completeColor={color.complete}
      >
        {track.title}
      </CompletedDiv >

    </>
  );



};

export default Track;
