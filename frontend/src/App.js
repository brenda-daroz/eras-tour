import './App.css';
import styled from "styled-components";
import Tracks from './components/Tracks';
import { handleData } from './services/handleAlbums';
import { useEffect, useState } from "react";
import Info from './components/Info';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function App() {
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const response = await handleData();
      setData(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <>
    <Container>
      {data.map((album, i) => {
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
    <Info/>
    </>
  );

}


export default App;
