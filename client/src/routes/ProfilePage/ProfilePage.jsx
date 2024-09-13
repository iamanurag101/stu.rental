import React, { useEffect, useContext } from 'react'; 
import './ProfilePage.scss';
import List from '../../components/List/List';
import apiRequest from '../../lib/apiRequest';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthContext } from '../../Context/AuthContext';

function ProfilePage() {
  const data = useLoaderData();

  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Handle logout
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
    currentUser && (
      <div className='profilePage'>
        <div className="details">
          <div className="wrapper">
            {/* User Information */}
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

            {/* My Listings Section */}
            <div className="title">
              <h1>My Listings</h1>
              <Link to="/add">
                <button className='nav-links'>Add new listing</button>
              </Link>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) => (
                  postResponse.data.userPosts && postResponse.data.userPosts.length > 0 ? (
                    <List posts={postResponse.data.userPosts} />
                  ) : (
                    <p className='message'>No listings found. Start creating your own listings to share with others!</p>
                  )
                )}
              </Await>
            </Suspense>

            {/* Saved Listings Section */}
            <div className="title">
              <h1>Saved Listings</h1>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) => (
                  postResponse.data.savedPosts && postResponse.data.savedPosts.length > 0 ? (
                    <List posts={postResponse.data.savedPosts} />
                  ) : (
                    <p className='message'>You haven’t saved any listings yet. Explore and save your favorite posts to keep track of them!</p>
                  )
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;
