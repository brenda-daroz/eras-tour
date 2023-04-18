import React from "react";
import styled from "styled-components";
import Track from "./Track";


const Wrapper = styled.div`{
  padding-top: 20px;
  background-color: ${props => props.bgColor};
  width: 20%;
  overflow: hidden;
}`

const Ul = styled.ul`{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: fit-content;
  padding: 0 10px;
  margin: 0 auto;
  height: 60%;
  justify-content: center
}`

const Li = styled.li`{
  list-style: none;
  text-transform: uppercase;
  font-weight: 500;
  color: ${props => props.fontColor};
  font-size: 0.95rem;
};`

const Img = styled.img`{
  object-fit: contain;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 0;
  display: block;
  // width: 600px;
  height: 450px;
  overflow: hidden;
  z-index: 100;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 10%, transparent 100%);

}`

export default function Tracks({ tracks, handleToggle, color, image }) {
  return (
    <Wrapper bgColor={color.background}>
      <Ul>
        {tracks.map((track, i) => {
          return (
            <Li key={i} fontColor={color.default}>
              <Track track={track} color={color} handleToggle={handleToggle} />
            </Li>
          )
        }
        )}
      </Ul>
      <Img src={image} alt="Fearless (Taylor's Version)"></Img>
    </Wrapper>
  );
}
