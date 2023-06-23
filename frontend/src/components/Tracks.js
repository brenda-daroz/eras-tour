import React from "react";
import styled from "styled-components";
import Track from "./Track";
import Tabs from "./Tabs";


const Wrapper = styled.div`{
  background: linear-gradient(to bottom, ${props => props.bgColor} 50%, transparent 100%);
  width: 20%;
  overflow: hidden;
  height: 100vh;
  @media only screen and (max-width: 700px) {
    width: 100%;
  }
}`

const Ul = styled.ul`{
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: fit-content;
  padding: 0 10px;
  margin: 30px auto;
  height: 45%;
  justify-content: center
}`

const Li = styled.li`{
  list-style: none;
  text-transform: uppercase;
  font-weight: 500;
  line-height: 1.7;
  color: ${props => props.fontColor};
  font-size: 0.85rem;
  text-align: center;
  text-decoration: dotted;
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
  height: 320px;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 70%, transparent 100%);
  @media only screen and (max-width: 700px) {
    zoom: 1.6;
}`

const Credit = styled.figcaption`{
    // background-color: #000;
    opacity: 0.8;
    border-radius: 5px;
    color: grey;
    font-size: 0.7rem;
    text-align: center;
    padding: 3px 3px;
    margin-top: -20px;
    @media only screen and (max-width: 700px) {
      margin-top: -170px;
      opacity: 1;
      color: grey;
      position: absolute;
      z-index: 5;
      background-color: white;
      padding: 0.5px 4px;
    }
}`

export default function Tracks({ tracks, color, image, title, latest, credit }) {

  return (
    <Wrapper bgColor={color.background}>

      <Tabs children={[
        {
          name: "Surprise", content:
            <Ul>
              {tracks.map((track, i) => {
                if (track.status.type === "surprise") {
                  return (
                    TracksList(i, track)
                  )
                }
              }
              )}
            </Ul>
        },
        {
          name: "Fixed", content:
            <Ul>
              {tracks.map((track, i) => {
                if (track.status.type === "fixed") {
                  return (
                    TracksList(i, track)
                  )
                }
              }
              )}
            </Ul>
        },
        {
          name: "Unplayed", content:
            <Ul>
              {tracks.map((track, i) => {
                if (track.status.type === "unplayed") {
                  return (
                    TracksList(i, track)
                  )
                }
              }
              )}
            </Ul>
        },
      ]} />
      <figure>
        <Img src={image} alt={title}></Img>
        <Credit>{credit}</Credit>
      </figure>
    </Wrapper>
  );

  function TracksList(i, track) {
    return <Li key={i} fontColor={color.default}>
      <Track track={track} color={color} latest={latest} />
    </Li>;
  }
}
