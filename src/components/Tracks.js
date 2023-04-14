import React from "react";
import styled from "styled-components";
import Track from "./Track";
import fearless from "../assets/fearless.png";

const Wrapper = styled.div`
background-color: #d9c78f;
padding-top: 20px;
`

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
  color: white;
  font-size: 1rem;
};`

const Img = styled.img`{
  object-fit: cover;
  object-position: center;
  margin: 0 auto;
  padding: 0;
  display: block;
  width: 300px;

}`

export default function Tracks({ tracks, handleToggle }) {


  return (
    <Wrapper>
      <Ul>
        {tracks.fearless.map((track, i) => {
          return (
            <Li>
              <Track track={track} handleToggle={handleToggle} key={i} />
            </Li>
          )
        }
        )}
      </Ul>
      <Img src={fearless} alt="Fearless (Taylor's Version)"></Img>
    </Wrapper>
  );
}
