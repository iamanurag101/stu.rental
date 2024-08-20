import React from 'react';
import './ProfilePage.scss';
import List from '../../components/List/List';
import apiRequest from '../../lib/apiRequest';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Suspense, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const ProfilePage = () => {
  const data = useLoaderData();

//   const { updateUser, currentUser } = useContext(AuthContext);

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
                    <button className='nav-links'>Update Profile</button>
                </div>
                <div className="info">
                    <span className='image'>
                        <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt=""/>
                    </span>
                    <div className="text">
                        <span>
                            Name: John Doe
                        </span>
                        <span>
                            E-mail: john@gmail.com
                        </span>
                    </div>   
                    <button onClick={handleLogout} className='nav-links'>Logout</button> 
                </div>
                <div className="title">
                    <h1>My Listings</h1>
                    <button className='nav-links'>Add new listing</button>
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

export default ProfilePage