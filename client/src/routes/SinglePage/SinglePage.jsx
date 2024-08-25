import "./SinglePage.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import { FaAngleRight, FaBed, FaBath, FaExpand, FaHeart, FaIndianRupeeSign, FaWifi } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../../Context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await apiRequest.delete(`/posts/${post.id}`);
        navigate("/"); // let us redirect to home page after deletion
      } catch (err) {
        console.log(err);
      }
    }
  };

  const postDetail = post.postDetail || {};
  let description = postDetail.desc || 'No description available';
  const isLongDescription = description.length > 200;
  const truncatedDescription = !showFullDescription && isLongDescription
    ? description.substring(0, 200) + '...'
    : description;

  return (
    <div className="singlePage">
      <div className="breadcrumbs">
        <div className="left">
          <Link to="/"><span className="text-links">Home</span></Link>
          <FaAngleRight className="icons" />
          <Link to="/list"><span className="text-links">Catalogue</span></Link>
          <FaAngleRight className="icons" />
          <span className="title">{post.title}</span>
        </div>
        <div className="right" onClick={handleSave}>
          <span style={{ color: saved ? "#df6361" : "#00050f" }}>{saved ? "Saved" : "Save"}</span>
          <FaHeart className="icon" style={{ color: saved ? "#df6361" : "#00050f" }} />
        </div>
      </div>
      <div className="content">
        <Slider images={post.images} className="slider" />
        <div className="text-content">
          <div className="property-details">
            <div className="basic-info">
              <h1 className="title">{post.title}</h1>
              <span className="rent"><FaIndianRupeeSign className="icons" />{post.price}/<span className="type">month</span></span>
            </div>
            <div className="sizes">
              <span className="size"><FaBed />{post.bedRooms} {post.bedRooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
              <span className="size"><FaBath />{post.bathroom} {post.bathroom === 1 ? 'Bathroom' : 'Bathrooms'}</span>
            </div>
            <div className="amenities">
              <h1 className="title">WiFi Availability</h1>
              <div className="amenity-wrapper">
                <div className="amenity"><FaWifi />{post.amenities === "yes" ? "Yes" : post.amenities === "no" ? "No" : "Not Sure"}</div>
              </div>
            </div>
            <div className="description">
              <h1 className="title">Description</h1>
              <div className="text" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncatedDescription) }} />
              {isLongDescription && (
                <span onClick={() => setShowFullDescription((prevState) => !prevState)} className="read-more">
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </span>
              )}
            </div>
          </div>
          <div className="author">
            {post.user && (
              <>
                <img src={post.user.avatar} alt={`${post.user.username}'s avatar`} />
                <span className="name">{post.user.username}</span>
                <a href={`mailto:${post.user.email}?subject=Enquiry%20regarding%20your%20listing%20on%20stu.rental`} className="nav-links">Send a message</a>
              </>
            )}
          </div>
        </div>
        <div className="mapContainer">
          <Map items={[post]} />
        </div>
        {currentUser?.id === post.userId && (
          <button className="deleteButton" onClick={handleDelete}>Delete Listing</button>
        )}
      </div>
    </div>
  );
}

export default SinglePage;
