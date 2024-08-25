import { useContext, useState } from "react";
import "./ProfileUpdatePage.scss";
import { AuthContext } from "../../Context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget.jsx/UploadWidget";

function ProfileUpdatePage() {
  
    const { currentUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState([]);
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
  
      const { username, email, password } = Object.fromEntries(formData);
  
      try {
        const res = await apiRequest.put(`/users/${currentUser.id}`, {
          username,
          email,
          password,
          avatar:avatar[0]
        });
        updateUser(res.data);
        navigate("/profile");
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
      }
    };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" defaultValue={currentUser.username}/>
          </div>

          <div className="item">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" defaultValue={currentUser.email}/>
          </div>

          <div className="item">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"/>
          </div>

          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/avatar.jpg"} alt="" className="avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: "dgeoqgc3s",
            uploadPreset: "stu.rental",
            multiple: false,
            maxImageFileSize: 2000000,
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
