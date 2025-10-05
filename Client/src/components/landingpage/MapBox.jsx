import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const defaultPosition = [40.7128, -74.006]; // New York fallback

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? (
    <Marker position={position} icon={customIcon}>
      <Popup>Selected Location</Popup>
    </Marker>
  ) : null;
}

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
}

export default function MapBox({ searchQuery, onResults, selected }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          setPosition(defaultPosition);
        }
      );
    } else {
      setPosition(defaultPosition);
    }
  }, []);

  // search effect
  // search effect
  useEffect(() => {
    if (searchQuery) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: {
            "User-Agent": "MyReactApp/1.0 (contact: noursayed200408@gmail.com)",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Search results:", data);
          if (data && data.length > 0) {
            onResults(data);
            const { lat, lon } = data[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);
          } else {
            onResults([]);
            console.log("No results found");
          }
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [searchQuery]);

  /// if i used drop pin
  useEffect(() => {
    if (selected) {
      const { lat, lon,name } = selected;
      setPosition([parseFloat(lat), parseFloat(lon)]);
      searchQuery=name
    }
  }, [selected]);

  return (
    <div className="w-full h-[200px] md:h-[400px] rounded-lg overflow-hidden border border-[#00B8D9]/30">
      <MapContainer
        center={position || defaultPosition}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker position={position} setPosition={setPosition} />
        <RecenterMap position={position} />
      </MapContainer>
    </div>
  );
}
