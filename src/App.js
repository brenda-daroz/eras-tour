import './App.css';
import styled from "styled-components";
import Tracks from './components/Tracks';
import data from './data/ts-discography.json';
import { useState } from "react";


const Container = styled.div`
  display: flex;
  // align-items: center;
  // flex-direction: column;
`;

function App() {

  const [albums, setAlbums] = useState(data.albums);

  const handleToggle = (albumName) => {
    return (id) => {
      setAlbums(albums.map(album => {
        return album.title === albumName ? {
          ...album, tracks: album.tracks.map(track => {
            return track.id === Number(id) ? { ...track, special: !track.special } : { ...track };
          })
        } : { ...album };
      })
      )
    }
  }

  return (
    <Container>
      {albums.map(album => {

        return (
          <Tracks image={album.cover} color={album.color} tracks={album.tracks} handleToggle={handleToggle(album.title)} key={album.title} />
        )

      })}
    </Container>
  );
}

export default App;
