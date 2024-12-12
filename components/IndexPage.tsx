"use client";

import React from "react";
import styled from "styled-components";
import Tracks from "./Tracks";
import Loader from "./Loader";
import Info from "./Info";
import { useState } from "react";
import { UIDataOutput } from "@/lib/logic";
import FabYear from "./Fab";
import { LastPlayedSurpriseSongs } from "./LastPlayedSurpriseSongs";
import Custom500 from "@/pages/500";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
`;

export default function IndexPage({
  data
}: {
  data?: { data2023: UIDataOutput; data2024: UIDataOutput; data: UIDataOutput }, error?: boolean;
}) {
  if (!data) {
    return <Custom500 />;
  }
  const [year, setYear] = useState<number | null>(2024);
  const dataYear =
    year === 2024 ? data.data2024 : year === 2023 ? data.data2023 : data.data;

  const options = [
    { name: "All", onSelect: () => setYear(null) },
    { name: "2023", onSelect: () => setYear(2023) },
    { name: "2024", onSelect: () => setYear(2024) },
  ];

  const tracks = dataYear.map((album) => album.tracks).flat();

  return (
    <>
      <LastPlayedSurpriseSongs data={tracks} />
      <Container>
        <FabYear options={options} year={year ? String(year) : "All"} />
        {dataYear.length === 0 ? (
          <Loading>
            <Loader />
          </Loading>
        ) : (
          dataYear.map((album, i) => {
            return <Tracks key={i} {...album} />;
          })
        )}
      </Container>
      <Info />
    </>
  );
}
