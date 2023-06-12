import './App.css';
import styled from "styled-components";
import Tracks from './components/Tracks';
import { handleAlbums, handleSpecial, putAlbum } from './services/handleAlbums';
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Latest = styled.span`
  color: red;
  font-size: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
  `

function App() {

  const [albums, setAlbums] = useState([]);
  const [special, setSpecial] = useState([])

  const getAlbums = async () => {
    try {
      const response = await handleAlbums();
      setAlbums(response)
    } catch (err) {
      console.log(err)
    }
  }

  const getSpecial = async () => {
    try {
      const response = await handleSpecial();
      setSpecial(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAlbums()
    getSpecial()
  }, [])


  function markSpecial(album) {
    return {
      ...album, tracks: album.tracks.map(track => {
        return special.includes(track.title) ? { ...track, special: true } : { ...track };
      })
    }
  }


  const handleToggle = (albumName) => {
    return (id) => {
      const selectedAlbum = albums.find(album => album.title === albumName)
      const updatedAlbum = markSpecial(selectedAlbum, id)
      putAlbum(updatedAlbum)
      setAlbums(albums.map(album => {
        return album.title === albumName ? updatedAlbum : album;
      })
      )
    }
  }

  const latest = special.slice(0, 2)

  return (
    <Container>
      {albums.map(album => {

        return (
          <Tracks
            title={album.title}
            image={album.cover}
            color={album.color}
            tracks={album.tracks}
            handleToggle={handleToggle(album.title)} key={album.title}
            latest={latest}
          />

        )

      })}
    </Container>
  );

}

export default App;
