import React from "react";
import styled from "styled-components";



const CompletedDiv = styled.div`{
cursor: ${props => (props.fixed ? "default" : "pointer")};
color: ${props => (props.special ? props.specialColor : props.fixed ? props.fixedColor : "#f3f6f4")}
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
        onClick={track.fixed ? null : handleClick}
        special={track.special}
        specialColor={color.special}
        fixed={track.fixed}
        fixedColor={color.fixed}
      >
        {track.title}
      </CompletedDiv >

    </>
  );



};

export default Track;
