import { useState } from "react";
import "./NewPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget.jsx/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage(){
    const [value,setValue] = useState("");
    const [images, setImages] = useState([]);
    const [error,setError] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);
        
        try {
            const res = await apiRequest.post("/posts", {
                postData: {
                  title: inputs.title,
                  price: parseInt(inputs.price),
                  address: inputs.address,
                  city: inputs.city,
                  bedroom: parseInt(inputs.bedroom),
                  bathroom: parseInt(inputs.bathroom),
                  type: inputs.type,
                  property: inputs.property,
                  latitude: inputs.latitude,
                  longitude: inputs.longitude,
                  images: images,
                },
                postDetail: {
                  desc: value,
                  utilities: inputs.utilities,
                },
              });
              navigate("/"+res.data.id)
        } catch (err) {
            console.log(err)
            setError(error);
        }
    };

    return (
        <div className="newPostPage">
            <div className="formContainer">
                <h1 style={{fontWeight: 500}}>Add New Post</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text"/>
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input id="price" name="price" type="number"/>
                        </div>
                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input id="address" name="address" type="text"/>
                        </div>
                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill theme="snow" onChange={setValue} value={value}/>
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input id="city" name="city" type="text"/>
                        </div>
                        <div className="item">
                            <label htmlFor="bedroom">Bedroom Number</label>
                            <input min={1} id="bedroom" name="bedroom" type="number"/>
                        </div>
                        <div className="item">
                            <label htmlFor="bathroom">Bathroom Number</label>
                            <input min={1} id="bathroom" name="bathroom" type="number"/>
                        </div>
                        <div className="item">
                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" name="latitude" type="text"/>
                        </div>
                        <div className="item">
                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" name="longitude" type="text"/>
                        </div>
                        <div className="item">
                            <label htmlFor="type">Type</label>
                            <select name="type">
                            <option value="men" defaultChecked>
                                Men
                            </option>
                            <option value="women">Women</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="type">Property</label>
                            <select name="property">
                                <option value="single">Single</option>
                                <option value="multisharing">Multi Sharing</option>
                            </select>
                        </div>

                        <div className="item">
                            <label htmlFor="utilities">Utilities Policy</label>
                            <select name="utilities">
                                <option value="shared">Not Sure</option>
                                <option value="owner">Owner is responsible</option>
                                <option value="tenant">Tenant is responsible</option>
                            </select>
                        </div>
                    
                        <button className="sendButton">Update</button>
                        {error && <span>error</span>}
                    </form>
                    {/* Geolocation Link */}
                    <div className="geolocationLink">
                        <p>You can know the geolocation of your listing by using this third party service:</p>
                        <a href="https://www.latlong.net" target="_blank" rel="noopener noreferrer">[Link] </a>
                    </div>
                </div>
            </div>
            <div className="sideContainer">
            <h2 style={{fontWeight: 500}}>Upload Pictures</h2>
            <div className="img-wrapper">
                {images.map((image, index) => (
                    <img src={image} key={index} alt="" />
                ))}
                <UploadWidget uwConfig={{
                    multiple:true,
                    cloudName: "dgeoqgc3s",
                    uploadPreset: "stu.rental",
                }}
                setState={setImages}
                />`
            </div>   
            </div>
        </div>
    );
}

export default NewPostPage;