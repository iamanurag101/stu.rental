import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./UpdatePostPage.scss";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget.jsx/UploadWidget";
import { FaArrowUpRightFromSquare, FaX } from "react-icons/fa6";

function UpdatePostPage() {
    const post = useLoaderData();
    const navigate = useNavigate();

    const [value, setValue] = useState(post?.postDetail?.desc || "");
    const [images, setImages] = useState(post?.images || []);
    const [title, setTitle] = useState(post?.title || "");
    const [price, setPrice] = useState(post?.price || "");
    const [address, setAddress] = useState(post?.address || "");
    const [city, setCity] = useState(post?.city || "");
    const [bedroom, setBedroom] = useState(post?.bedroom || 1);
    const [bathroom, setBathroom] = useState(post?.bathroom || 1);
    const [latitude, setLatitude] = useState(post?.latitude || "");
    const [longitude, setLongitude] = useState(post?.longitude || "");
    const [type, setType] = useState(post?.type || "men");
    const [property, setProperty] = useState(post?.property || "single");
    const [amenities, setAmenities] = useState(post?.postDetail?.amenities || "yes");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiRequest.put(`/posts/${post.id}`, {
                postData: {
                    title,
                    price: parseInt(price),
                    address,
                    city,
                    bedroom: parseInt(bedroom),
                    bathroom: parseInt(bathroom),
                    type,
                    property,
                    latitude,
                    longitude,
                    images,
                },
                postDetail: {
                    desc: value,
                    amenities,
                },
            });
            navigate("/" + post.id);
        } catch (err) {
            console.log(err);
            setError("Something went wrong while updating.");
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== indexToRemove));
    };


    return (
        <div className="updatePostPage">
            <div className="formContainer">
                <h1 style={{ fontWeight: 500 }}>Update Post</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input id="price" name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input id="address" name="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input id="city" name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="item">
                            <label htmlFor="bedroom">Bedroom Number</label>
                            <input min={1} id="bedroom" name="bedroom" type="number" value={bedroom} onChange={(e) => setBedroom(e.target.value)} />
                        </div>
                        <div className="item">
                            <label htmlFor="bathroom">Bathroom Number</label>
                            <input min={1} id="bathroom" name="bathroom" type="number" value={bathroom} onChange={(e) => setBathroom(e.target.value)} />
                        </div>
                        <div className="item">
                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" name="latitude" type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                            <a href="https://www.latlong.net" target="_blank" rel="noopener noreferrer">Find Latitude/Longitude <FaArrowUpRightFromSquare className="icons" /></a>
                        </div>
                        <div className="item">
                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" name="longitude" type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                            <a href="https://www.latlong.net" target="_blank" rel="noopener noreferrer">Find Latitude/Longitude <FaArrowUpRightFromSquare className="icons" /></a>
                        </div>
                        <div className="item">
                            <label htmlFor="type">Type</label>
                            <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="property">Property</label>
                            <select name="property" value={property} onChange={(e) => setProperty(e.target.value)}>
                                <option value="single">Single</option>
                                <option value="multisharing">Multi Sharing</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="amenities">WiFi Available?</label>
                            <select name="amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)}>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                                <option value="notsure">Not Sure</option>
                            </select>
                        </div>
                        <button className="sendButton">Update Listing</button>
                        {error && <span>{error}</span>}
                    </form>
                </div>
            </div>
            <div className="sideContainer">
                <h2 style={{ fontWeight: 500 }}>Upload Pictures</h2>
                <div className="img-wrapper">
                {images.map((image, index) => (
                    <div className="img-preview" key={index}>
                    <img src={image} alt={`upload-${index}`} />
                    <button
                        type="button"
                        className="delete-btn"
                        onClick={() => handleRemoveImage(index)}
                    >
                        <FaX className="icons"/>
                    </button>
                    </div>
                ))}
                <UploadWidget
                    uwConfig={{
                    multiple: true,
                    cloudName: "dgeoqgc3s",
                    uploadPreset: "stu.rental",
                    }}
                    setState={setImages}
                />
                </div>
            </div>
        </div>
    );
}

export default UpdatePostPage;