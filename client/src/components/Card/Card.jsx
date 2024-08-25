import { Link } from "react-router-dom";
import "./Card.scss";
import { FaHeart, FaLocationDot, FaBed, FaBath, FaIndianRupeeSign } from 'react-icons/fa6';

function Card({ item,isHome }) {
  return (
    <div className={`card ${isHome ? 'homeCard' : 'regularCard'}`}>
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          {item.title}
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
        </div>
        <Link to={`/${item.id}`}><div className="nav-links">See Listing</div></Link>
      </div>
    </div>
  );
}

export default Card;