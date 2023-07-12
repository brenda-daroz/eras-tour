import './App.css';
import styled from "styled-components";
import Tracks from './components/Tracks';
import { handleData } from './services/handleAlbums';
import { useEffect, useState } from "react";
import Info from './components/Info';
import Loader from './components/Loader';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Loading = styled.div`
height: 100vh;
width: 100vw;
background-color: #f5f5f5;
}`



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

        {data.length === 0 ? <Loading><Loader/></Loading> :
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


export default App;
