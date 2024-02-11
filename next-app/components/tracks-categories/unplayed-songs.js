const { Ul } = require("./surprise-songs");

export function UnplayedTracks({ unplayedTracks, TracksList }) {
  return (
    <Ul>
      {unplayedTracks.map((track, i) => {
        return TracksList(i, track);
      })}
    </Ul>
  );
}
