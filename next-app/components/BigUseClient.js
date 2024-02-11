"use client";

import styled from "styled-components";
import Tracks from "./Tracks";
import Loader from "./Loader";
import Info from "./Info";
import { useState } from "react";
import FabYear from "./fab";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
`;

export default function BigUseClient({ data }) {
  const [year, setYear] = useState(2024);
  const dataYear =
    year === 2024 ? data.data2024 : year === 2023 ? data.data2023 : data.data;

  const options = [
    { name: "All", func: () => setYear() },
    { name: "2023", func: () => setYear(2023) },
    { name: "2024", func: () => setYear(2024) },
  ];

  console.log(year);

  return (
    <>
      <Container>
        <FabYear options={options} year={options.name | year} />
        {dataYear.length === 0 ? (
          <Loading>
            <Loader />
          </Loading>
        ) : (
          dataYear.map((album, i) => {
            return (
              <Tracks
                key={i}
                image={album.cover}
                credit={album.coverCredit}
                color={album.color}
                tracks={album.tracks}
                title={album.title}
                year={year}
              />
            );
          })
        )}
      </Container>
      <Info />
    </>
  );
}
