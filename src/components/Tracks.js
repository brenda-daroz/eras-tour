import React from "react";
import styled from "styled-components";
import Track from "./Track";

const Ul = styled.ul`{
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  padding: 0;
}`

const Li = styled.li`{
  list-style: none;
  text-transform: capitalize;
  color: black;
  padding: 10px;
  font-size: 1.2rem;
};`

// const Button = styled.button`
//   border: none;
//   background-color: #f6ed95;
//   border-radius: 5px;
//   cursor: pointer;
// ;`


export default function Tracks({ tracks, handleToggle }) {


  return (
    <div>
      <h1>Fearless (Taylor's Version)</h1>
      <Ul>
        {tracks.map((track, i) => {
          return (
            <Li>
            <Track track={track} handleToggle={handleToggle} key={i}/>
            </Li>
          )
        }
        )}
      </Ul>
    </div>
  );
}
