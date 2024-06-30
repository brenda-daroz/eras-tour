import { useLatestSurpriseTracks } from "@/hooks/useLatest";
import { UIAlbum, UIDataOutput, UITrack } from "@/lib/logic";

export function LastPlayed({ data }: {data: UITrack[]}) {

  const latestSurpriseTracks = useLatestSurpriseTracks(data);

  const latest = latestSurpriseTracks.map((track) => track.title);

  console.log(latestSurpriseTracks);

  return (
    <div>
      <h2>Last Played</h2>
      <ul>
        {latest.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
