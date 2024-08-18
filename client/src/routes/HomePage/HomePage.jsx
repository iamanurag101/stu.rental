import React from 'react';
import './HomePage.scss';
import Searchbar from '../../components/Searchbar/Searchbar';

const HomePage = () => {
  return (
    <div className='homePage'>
      <div className="textContainer">
        <div className="wrapper">
          <h1 className='title'>Find Your Perfect Place</h1>
          <Searchbar/>
        </div>
      </div>
    </div>
  )
}

export default HomePage