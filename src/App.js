import './App.css';
import styled from "styled-components";
import Tracks from './components/Tracks';
import handleAlbums from './services/handleAlbums';
import { useEffect, useState } from "react";


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  // align-items: center;
  // flex-direction: column;
`;

function App() {

  const [albums, setAlbums] = useState([]);

  const getAlbums = async () => {
    try {
      const response = await handleAlbums();
      setAlbums(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAlbums()
  }, [])

  const handleToggle = (albumName) => {
    return (id) => {
      setAlbums(albums.map(album => {
        return album.title === albumName ? {
          ...album, tracks: album.tracks.map(track => {
            return track.id === Number(id) && !track.fixed ? { ...track, special: !track.special } : { ...track };
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
          <Tracks
            title={album.title}
            image={album.cover}
            color={album.color}
            tracks={album.tracks}
            handleToggle={handleToggle(album.title)} key={album.title} />
        )

      })}
    </Container>
  );
}

export default App;
