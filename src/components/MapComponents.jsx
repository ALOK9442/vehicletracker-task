import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const vehicleIcon = new L.Icon({
  iconUrl:
    "https://i.pinimg.com/564x/85/f9/3b/85f93bad9f0c4f9c05f1e4976f464a9b.jpg",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const initialPositions = [
  { latitude: 28.613939, longitude: 77.209023, timestamp: "2024-07-20T10:00:00Z" },
  { latitude: 28.612673, longitude: 77.227001, timestamp: "2024-07-20T10:00:05Z" },
  { latitude: 28.625789, longitude: 77.236099, timestamp: "2024-07-20T10:00:10Z" },
  { latitude: 28.656159, longitude: 77.241020, timestamp: "2024-07-20T10:00:15Z" },
];

const MapComponent = () => {
  const [positions, setPositions] = useState(initialPositions);
  const [currentPosition, setCurrentPosition] = useState(initialPositions[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Updating position");
      setCurrentPosition((prev) => {
        const currentIndex = positions.indexOf(prev);
        const nextIndex = (currentIndex + 1) % positions.length;
        return positions[nextIndex];
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [positions]);

  return (
    <MapContainer
      center={[28.613939, 77.209023]}
      zoom={15}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {currentPosition && (
        <Marker
          position={[currentPosition.latitude, currentPosition.longitude]}
          icon={vehicleIcon}
        >
          <Popup>
            <div>
              <h3>Vehicle Details</h3>
              <p>
                <strong>Latitude:</strong> {currentPosition.latitude}
              </p>
              <p>
                <strong>Longitude:</strong> {currentPosition.longitude}
              </p>
              <p>
                <strong>Speed:</strong> {Math.floor(Math.random() * 100)} km/hr
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(currentPosition.timestamp).toLocaleString()}
              </p>
            </div>
          </Popup>
        </Marker>
      )}
      <Polyline
        positions={positions.map((pos) => [pos.latitude, pos.longitude])}
        color="blue"
      />
    </MapContainer>
  );
};

export default MapComponent;
