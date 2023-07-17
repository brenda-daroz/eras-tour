"use client"

import styled from "styled-components";
import Tracks from "./Tracks";
import Loader from "./Loader";
import Info from "./Info";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Loading = styled.div`
height: 100vh;
width: 100vw;
background-color: #f5f5f5;
`

export default function BigUseClient({ data }) {
  return (
    <>
      <Container>

        {data.length === 0 ? <Loading><Loader /></Loading> :
          data.map((album, i) => {
            return (
              <Tracks
                key={i}
                image={album.cover}
                credit={album.coverCredit}
                color={album.color}
                tracks={album.tracks}
              />
            )
          })}
      </Container>
      <Info />
    </>
  );
}
