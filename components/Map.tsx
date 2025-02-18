import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Location {
  eventDate: string;  
  venue: string;      
  city: string;       
  country: string;   
  surpriseSongs: string[]; 
  coords: { lat: number; long: number };  
}

interface MapboxProps {
  locations: Location[];  
}

const MapboxExample: React.FC<MapboxProps> = ({ locations }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [resolvedLocations, setResolvedLocations] = useState<
    { name: string; coordinates: [number, number]; description: string }[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!mapContainerRef.current || mapRef.current) return;

    fetch("/api/mapbox")
      .then((res) => res.json())
      .then(async (data) => {
        mapboxgl.accessToken = data.token;

        if (!mapboxgl.accessToken) {
          console.error("⚠️ Mapbox access token is missing!");
          return;
        }

        const groupedLocations: Record<string, Location[]> = locations.reduce((acc, location) => {
          if (!acc[location.venue]) {
            acc[location.venue] = [];
          }
          acc[location.venue].push(location);
          return acc;
        }, {} as Record<string, Location[]>);

        const resolved = Object.entries(groupedLocations).map(([venue, venueLocations]) => {
          // Combine events for the same venue
          const coordinates: [number, number] = [venueLocations[0].coords.long, venueLocations[0].coords.lat];
          const name = `${venueLocations[0].city}, ${venueLocations[0].country}`;
          const description = venueLocations.map((loc) => {
            return `<strong>${loc.eventDate}</strong><br/>${loc.surpriseSongs.join(', ')}`;
          }).join("<br/><br/>");

          return { venue, coordinates, name, description };
        });

        setResolvedLocations(resolved);

        const map = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: "mapbox://styles/mapbox/streets-v11",
          // center: resolved[0]?.coordinates || [-74.5, 40], 
          zoom: 2,
        });

        mapRef.current = map;

        resolved.forEach((location) => {
          const marker = new mapboxgl.Marker({ color: "red" })
            .setLngLat(location.coordinates)
            .addTo(map);

          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${location.venue}</h3>
            <p>${location.description}</p>`
          );

          marker.setPopup(popup);
        });
      })
      .catch((error) => console.error("Error fetching Mapbox token:", error));

    return () => mapRef.current?.remove(); 
  }, [locations]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default MapboxExample;
