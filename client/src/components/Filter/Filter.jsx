import React, { useState } from 'react';
import './Filter.scss';
import { FaMagnifyingGlass, FaIndianRupeeSign, FaDoorOpen, FaBuilding, FaLocationDot, FaPerson, FaPersonDress, FaAngleDown } from "react-icons/fa6";

const Filter = () => {
  const [gender, setGender] = useState("men");

  return (
    <div className='filter'>
      <h1 style={{ fontWeight: 500 }}>Catalogue</h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <div className="input-wrapper">
            <FaLocationDot className="icon" />
            <input type="text" id='city' name='city' placeholder='Location' />
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="gender">Gender</label>
          <div className="input-wrapper">
            {gender === "men" ? (
              <FaPerson className="icon" />
            ) : (
              <FaPersonDress className="icon" />
            )}
            <select
              name='gender'
              id='gender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
            <FaAngleDown className='down-arrow'/>
          </div>
        </div>
        <div className="item">
          <label htmlFor="property">Property Type</label>
          <div className="input-wrapper">
            <FaBuilding className="icon" />
            <select name="property" id="property">
              <option value="">Any</option>
              <option value="apartment">Single</option>
              <option value="house">Multi Sharing</option>
            </select>
            <FaAngleDown className='down-arrow'/>
          </div>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <div className="input-wrapper">
            <FaIndianRupeeSign className="icon" />
            <input type="number" id="minPrice" name="minPrice" placeholder="Any" />
          </div>
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <div className="input-wrapper">
            <FaIndianRupeeSign className="icon" />
            <input type="number" id="maxPrice" name="maxPrice" placeholder="Any" />
          </div>
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedrooms</label>
          <div className="input-wrapper">
            <FaDoorOpen className="icon" />
            <input type="number" id="bedroom" name="bedroom" placeholder="Any" />
          </div>
        </div>
        <button>
          <FaMagnifyingGlass />
        </button>
      </div>
    </div>
  );
};

export default Filter;
