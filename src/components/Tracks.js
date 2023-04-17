import React from "react";
import styled from "styled-components";
import Track from "./Track";


const Wrapper = styled.div`{
  padding-top: 20px;
  background-color: ${props => props.bgColor};
  width: 20%;
}`

const Ul = styled.ul`{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: fit-content;
  padding: 0 10px;
  margin: 0 auto;
}`

const Li = styled.li`{
  list-style: none;
  text-transform: uppercase;
  font-weight: 500;
  color: ${props => props.fontColor};
  font-size: 1rem;
};`

const Img = styled.img`{
  object-fit: contain;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 0;
  display: block;
  width: 450px;
  overflow: hidden;

}`

export default function Tracks({ tracks, handleToggle, color, image }) {
  return (
    <Wrapper bgColor={color.background}>
      <Ul>
        {tracks.map((track, i) => {
          return (
            <Li key={i} fontColor={color.default}>
              <Track track={track} color={color} handleToggle={handleToggle}/>
            </Li>
          )
        }
        )}
      </Ul>
      <Img src={image} alt="Fearless (Taylor's Version)"></Img>
    </Wrapper>
  );
}
