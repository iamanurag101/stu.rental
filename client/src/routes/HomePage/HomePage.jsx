import React, { useContext } from 'react';
import './HomePage.scss';
import Searchbar from '../../components/Searchbar/Searchbar';
import ListPage from '../ListPage/ListPage';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const HomePage = () => {

  // const {currentuser} = useContext(AuthContext);

  return (
    <div className='homePage'>
      <div className="textContainer">
        <div className="wrapper">
          <h1 className='title'>Find Your Perfect Place</h1>
          <Searchbar/>
        </div>
      </div>
      <div className='text-content'>
        <h1 className='title'>Popular Accomodation</h1>
        <Link to='/list'><span className='text-links'>View Listings <FaArrowUpRightFromSquare className='icons'/></span></Link>
      </div>
      <ListPage isHome={true}/>
    </div>
  )
}

export default HomePage