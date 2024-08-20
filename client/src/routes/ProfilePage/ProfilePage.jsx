import React, { useContext } from 'react';
import './ProfilePage.scss';
import List from '../../components/List/List';
import apiRequest from '../../lib/apiRequest';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const ProfilePage = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='profilePage'>
        <div className="details">
            <div className="wrapper">
                <div className="title">
                    <h1>User Information</h1>
                    <Link to="/profile/update">
                        <button className='nav-links'>Update Profile</button>
                    </Link>
                </div>
                <div className="info">
                    <span className='image'>
                        <img src={currentUser.avatar || './avatar.jpg'} alt="User Avatar"/>
                    </span>
                    <div className="text">
                        <span>
                            Name: {currentUser.username}
                        </span>
                        <span>
                            E-mail: {currentUser.email}
                        </span>
                    </div>   
                    <button onClick={handleLogout} className='nav-links'>Logout</button> 
                </div>
                <div className="title">
                    <h1>My Listings</h1>
                    <Link to="/add">
                        <button className='nav-links'>Add new listing</button>
                    </Link>
                </div>
                <List/>
                <div className="title">
                    <h1>Saved Listings</h1>
                </div>
                <List/>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage;
