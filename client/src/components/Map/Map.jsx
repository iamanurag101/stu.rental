import React, { useEffect, useState } from 'react';
import './Map.scss';
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Pin from '../Pin/Pin';

const Map = ({ items }) => {
  const [mapCenter, setMapCenter] = useState([22.5744, 88.3629]); // fallback center
  const [locationLoaded, setLocationLoaded] = useState(items.length === 1); // skip loading if single item

  useEffect(() => {
    // Only try to get geolocation if multiple posts
    if (items.length > 1 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          setLocationLoaded(true);
        },
        () => {
          setLocationLoaded(true); // failed, fallback
        }
      );
    }
  }, [items]);

  const initialCenter =
    items.length === 1
      ? [items[0].latitude, items[0].longitude]
      : mapCenter;

  return locationLoaded ? (
    <MapContainer
      center={initialCenter}
      zoom={9}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
    </MapContainer>
  ) : (
    <p>Loading map...</p>
  );
};

export default Map;