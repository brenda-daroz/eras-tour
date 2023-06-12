import React from "react";
import styled from "styled-components";



const CompletedDiv = styled.div`{
cursor: ${props => (props.fixed ? "default" : "pointer")};
color: ${props => (props.special ? props.specialColor : props.fixed ? props.fixedColor : "#f3f6f4")}
}`

const Latest = styled.span`
  color: red;
  font-size: 0.6rem;
  background: #f3f6f4;
  border-radius: 5px;
  padding: 0 5px;
  font-weight: 500;
  text-transform: uppercase;
  `
const Div = styled.div`{
  display: flex;
  align-items: center;
  gap: 5px;
  `

const Track = ({ track, handleToggle, color, latest }) => {

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
        {latest.includes(track.title) ? <Div>{track.title} <Latest>latest</Latest></Div> : <div>{track.title}</div>}
      </CompletedDiv >

    </>
  );



};

export default Track;
