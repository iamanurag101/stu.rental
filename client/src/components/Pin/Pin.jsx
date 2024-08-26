import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import './Pin.scss';
import { FaIndianRupeeSign, FaHouse } from 'react-icons/fa6';
import ReactDOMServer from 'react-dom/server'; // For rendering React components to HTML

// Convert React component to HTML
const HouseIcon = () => (
  <div style={{ fontSize: '24px', color: '#80471c' }}>
    <FaHouse/>
  </div>
);

// Render the React component to an HTML string
const houseIconHTML = ReactDOMServer.renderToString(<HouseIcon />);

// Create a custom Leaflet icon
const houseIcon = L.divIcon({
  className: 'custom-icon',
  html: houseIconHTML,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const Pin = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]} icon={houseIcon}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b><FaIndianRupeeSign className='icons'/> {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
