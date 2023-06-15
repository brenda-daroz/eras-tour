import React from "react";
import styled from "styled-components";
import Track from "./Track";


const Wrapper = styled.div`{
  padding-top: 60px;
  background: linear-gradient(to bottom, ${props => props.bgColor} 50%, transparent 100%);
  width: 20%;
  overflow: hidden;
  height: 100vh;

  @media only screen and (max-width: 700px) {
    width: 100%;
  }
}`

const Ul = styled.ul`{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: fit-content;
  padding: 0 10px;
  margin: 5px auto;
  height: 60%;
  justify-content: center
}`

const Li = styled.li`{
  list-style: none;
  text-transform: uppercase;
  font-weight: 500;
  line-height: 1.35;
  color: ${props => props.fontColor};
  font-size: 0.85rem;
  text-align: center;
  @media only screen and (max-width: 700px) {
    font-size: 1rem;
  }
};`

const Img = styled.img`{
  object-fit: contain;
  margin-left: 50%;
  transform: translateX(-50%);
  zoom: 1.2;
  padding: 0;
  display: block;
  height: 400px;
  overflow: hidden;
  z-index: 100;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 40%, transparent 100%);
}`

export default function Tracks({ tracks, color, image, title, latest }) {
  return (
    <Wrapper bgColor={color.background}>
      <Ul>
        {tracks.map((track, i) => {
          return (
            <Li key={i} fontColor={color.default}>
              <Track track={track} color={color} latest={latest} />
            </Li>
          )
        }
        )}
      </Ul>
      <Img src={image} alt={title}></Img>
    </Wrapper>
  );
}
