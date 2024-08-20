import "./SinglePage.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import { singlePostData, userData } from "../../lib/dummyData";
import { FaAngleRight, FaBed, FaBath, FaExpand, FaHeart, FaIndianRupeeSign, FaWifi, FaHospital, FaBus, FaTablets } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

function SinglePage() {

  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = singlePostData.description;

  if (!showFullDescription) {
    description = description.substring(0, 200) + '...';
  }

  return (
    <div className="singlePage">
      <div className="breadcrumbs">
        <div className="left">
          <Link to="/"><span className="text-links">Home</span></Link>
          <FaAngleRight className="icons"/>
          <Link to="/list"><span className="text-links">Catalogue</span></Link>
          <FaAngleRight className="icons"/>
          <span className="title">{singlePostData.title}</span>
        </div>
        <div className="right">
          <span>Like</span>
          <FaHeart className="icon"/>
        </div>
      </div>
      <div className="content">
        <Slider images={singlePostData.images} className='slider'/>
        <div className="text-content">
          <div className="property-details">
            <div className="basic-info">
              <h1 className="title">{singlePostData.title}</h1>
              <span className="rent"><FaIndianRupeeSign className="icons"/>{singlePostData.price}/<span className="type">month</span></span>
            </div>
            <div className="sizes">
              <span className="size"><FaBed/>{singlePostData.bedRooms} {singlePostData.bedRooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
              <span className="size"><FaBath/>{singlePostData.bathroom} {singlePostData.bathroom === 1 ? 'Bathroom' : 'Bathrooms'}</span>
              <span className="size"><FaExpand/>{singlePostData.size} sq. m</span>
            </div>
            <div className="amenities">
              <h1 className="title">Amenities</h1>
              <div className="amenity-wrapper">
                <div className="amenity"><FaWifi/>Wi-Fi</div>
              </div>  
            </div>
            <div className="description">
              <h1 className="title">Description</h1>
              <div className="text">
                <p>{description}</p>
                <span onClick={() => setShowFullDescription((prevState) => !prevState)} className="read-more">
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </span>
              </div> 
            </div>
            <div className="location">
              <h1 className="title">Location</h1>
              <div className="nearby-wrapper">
                <div className="near-by"><FaHospital className="icons"/><span>Hospital</span>{singlePostData.hospital}</div>
                <div className="near-by"><FaBus className="icons"/><span>Bus Stop</span>{singlePostData.busStop}</div>
                <div className="near-by"><FaTablets className="icons"/><span>Pharmacy</span>{singlePostData.pharmacy}</div>
              </div>
            </div>
          </div>
          <div className="author">
            <img src={userData.img} alt="" />
            <span className="name">{userData.name}</span>
            <a href={`mailto:${userData.mail}`} className="nav-links">Send a message</a>
          </div>
        </div>
        <div className="mapContainer">
          <Map items={[singlePostData]} />
        </div>
      </div>
    </div>
  );
}

export default SinglePage;