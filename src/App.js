import './App.css';
import styled from "styled-components";
import Tracks from './components/Tracks';
import data from './data/fearless.json';
import { useState } from "react";


const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

function App() {

  const [tracks, setTracks] = useState(data);

  const handleToggle = (id) => {
    let mapped = tracks.map(track => {
      return track.id === Number(id) ? { ...track, complete: !track.complete } : { ...track };
    });
    setTracks(mapped);
  }
  return (
    <Container>
      <h1>Eras Tour App</h1>
      <Tracks tracks={tracks} handleToggle={handleToggle} />
    </Container>
  );
}

export default App;
