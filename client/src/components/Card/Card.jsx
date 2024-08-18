import { Link } from "react-router-dom";
import "./Card.scss";
import { FaHeart, FaLocationDot, FaBed, FaBath, FaIndianRupeeSign } from 'react-icons/fa6';

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.img} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <FaLocationDot/>
          <span>{item.address}</span>
        </p>
        <div className="price"><FaIndianRupeeSign className="icon"/> {item.price} <span className="type">month</span></div>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <FaBed/>
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <FaBath/>
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icon">
            <FaHeart/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;