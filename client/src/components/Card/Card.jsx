import { Link } from "react-router-dom";
import "./Card.scss";
import { FaLocationDot, FaBed, FaBath, FaIndianRupeeSign, FaPerson, FaPersonDress } from 'react-icons/fa6';

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
              <span>{item.bedroom} {item.bedroom === 1 ? 'Bedroom' : 'Bedrooms'}</span>
            </div>
            <div className="feature">
              <FaBath/>
              <span>{item.bathroom} {item.bathroom === 1 ? 'Bathroom' : 'Bathrooms'}</span>
            </div>
            <div className="feature">
              {item.type === "men" ? <FaPerson/> : <FaPersonDress/>}
              <span>For {item.type === "men" ? "Men" : "Women"}</span>
            </div>
          </div>
        </div>
        <Link to={`/${item.id}`}><div className="nav-links">See Listing</div></Link>
      </div>
    </div>
  );
}

export default Card;