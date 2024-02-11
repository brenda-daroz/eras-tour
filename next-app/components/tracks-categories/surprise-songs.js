import styled from "styled-components";

export const Ul = styled.ul`
  padding-top: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: fit-content;
  padding: 0 10px;
  margin: 20px auto;
  height: 80%;
  justify-content: center;
`;

export function SurpriseTracks({ surpriseTracks, specialTracks, TracksList }) {
  return surpriseTracks.length > 0 ? (
    <Ul>
      {surpriseTracks.map((track, i) => {
        return TracksList(i, track);
      })}
      {specialTracks.map((track, i) => {
        return TracksList(i, track);
      })}
    </Ul>
  ) : (
    <Ul>
      <p>No 2024 surprise tracks yet.</p>
    </Ul>
  );
}
