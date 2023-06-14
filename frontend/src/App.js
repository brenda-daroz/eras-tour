import './App.css';
import styled from "styled-components";
import Tracks from './components/Tracks';
import { handleData } from './services/handleAlbums';
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function App() {
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const response = await handleData();
      console.log(response)
      setData(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  // function markSpecial(album) {
  //   return {
  //     ...album, tracks: album.tracks.map(track => {
  //       return special.includes(track.title) ? { ...track, special: true } : { ...track };
  //     })
  //   }
  // }

  // const handleToggle = (albumName) => {
  //   return (id) => {
  //     const selectedAlbum = albums.find(album => album.title === albumName)
  //     const updatedAlbum = markSpecial(selectedAlbum, id)
  //     putAlbum(updatedAlbum)
  //     setAlbums(albums.map(album => {
  //       return album.title === albumName ? updatedAlbum : album;
  //     })
  //     )
  //   }
  // }

  return (
    <Container>
      {data.map((album, i) => {
        return (
          <Tracks
            key={i}
            image={album.cover}
            color={album.color}
            tracks={album.tracks}
          />

        )

      })}
    </Container>
  );

}


export default App;
