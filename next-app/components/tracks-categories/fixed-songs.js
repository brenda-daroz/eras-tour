const { Ul } = require("./surprise-songs");

export function FixedTracks({ fixedTracks, TracksList }) {
  return fixedTracks.length > 0 ? (
    <Ul>
      {fixedTracks.map((track, i) => {
        return TracksList(i, track);
      })}
    </Ul>
  ) : (
    <Ul>
      <p>No fixed tracks</p>
    </Ul>
  );
}
