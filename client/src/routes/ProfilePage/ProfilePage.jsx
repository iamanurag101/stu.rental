import React, { useEffect, useContext } from 'react'; 
import './ProfilePage.scss';
import List from '../../components/List/List';
import apiRequest from '../../lib/apiRequest';
import { Await, Link, useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { FaEnvelope, FaUser } from 'react-icons/fa6';

function ProfilePage() {
  const data = useLoaderData();

  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const myPostsPage = parseInt(searchParams.get("myPostsPage")) || 1;
  const savedPostsPage = parseInt(searchParams.get("savedPostsPage")) || 1;

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
                  <FaUser className='icons'/><span className='b'>Name:</span> {currentUser.username}
                </span>
                <span>
                  <FaEnvelope className='icons'/><span className='b'>E-mail:</span> {currentUser.email}
                </span>
              </div>
              <button onClick={handleLogout} className='nav-links'>Logout</button>
            </div>

            {/* My Listings Section (updated with pagination) */}
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
                  <>
                    {postResponse.data.userPosts && postResponse.data.userPosts.length > 0 ? (
                      <List posts={postResponse.data.userPosts} />
                    ) : (
                      <p className='message'>No listings found. Start creating your own listings to share with others!</p>
                    )}
                    <Pagination
                      currentPage={myPostsPage}
                      totalPages={Math.ceil(postResponse.data.totalUserPosts / 3)}
                      pageParamName="myPostsPage"
                      otherPageParam={{ name: "savedPostsPage", value: savedPostsPage }}
                    />
                  </>
                )}
              </Await>
            </Suspense>

            {/* Saved Listings Section (updated with pagination) */}
            <div className="title">
              <h1>Saved Listings</h1>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse) => (
                  <>
                    {postResponse.data.savedPosts && postResponse.data.savedPosts.length > 0 ? (
                      <List posts={postResponse.data.savedPosts} />
                    ) : (
                      <p className='message'>You haven’t saved any listings yet. Explore and save your favorite posts to keep track of them!</p>
                    )}
                    <Pagination
                      currentPage={savedPostsPage}
                      totalPages={Math.ceil(postResponse.data.totalSavedPosts / 3)}
                      pageParamName="savedPostsPage"
                      otherPageParam={{ name: "myPostsPage", value: myPostsPage }}
                    />
                  </>
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    )
  );
}

function Pagination({ currentPage, totalPages, pageParamName, otherPageParam }){
  
  if(totalPages <= 1) return null;

  const createPageUrl = (pageNumber) => {
    return `?${pageParamName}=${pageNumber}&${otherPageParam.name}=${otherPageParam.value}`;
  };

  return (
    <div className="pagination">
      <Link
        to={createPageUrl(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : ""}
      >
        <button disabled={currentPage === 1}>Prev</button>
      </Link>
      <span>Page {currentPage} of {totalPages}</span>
      <Link
        to={createPageUrl(currentPage + 1)}
        className={currentPage === totalPages ? "disabled" : ""}
      >
        <button disabled={currentPage === totalPages}>Next</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
