import React, { useState, useEffect } from 'react';
import './Filter.scss';
import { FaMagnifyingGlass, FaIndianRupeeSign, FaBed, FaBuilding, FaLocationDot, FaPerson, FaPersonDress, FaAngleDown } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "men",
    city: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    property: searchParams.get("property") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className='filter'>
      <h1 style={{ fontWeight: 500 }}>Catalogue</h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <div className="input-wrapper">
            <FaLocationDot className="icon" />
            <input
              type="text"
              id='city'
              name='city'
              placeholder='Location'
              value={query.city}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Gender</label>
          <div className="input-wrapper">
            {query.type === "men" ? (
              <FaPerson className="icon" />
            ) : (
              <FaPersonDress className="icon" />
            )}
            <select
              name='type'
              id='type'
              value={query.type}
              onChange={handleChange}
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
            <select
              name="property"
              id="property"
              value={query.property}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="single">Single</option>
              <option value="multisharing">Multi Sharing</option>
            </select>
            <FaAngleDown className='down-arrow'/>
          </div>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <div className="input-wrapper">
            <FaIndianRupeeSign className="icon" />
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="Any"
              value={query.minPrice}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <div className="input-wrapper">
            <FaIndianRupeeSign className="icon" />
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="Any"
              value={query.maxPrice}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedrooms</label>
          <div className="input-wrapper">
            <FaBed className="icon" />
            <input
              type="number"
              id="bedroom"
              name="bedroom"
              placeholder="Any"
              value={query.bedroom}
              onChange={handleChange}
            />
          </div>
        </div>
        <button onClick={handleFilter}>
          <FaMagnifyingGlass />
        </button>
      </div>
    </div>
  );
};

export default Filter;
