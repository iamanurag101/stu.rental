import { useState } from "react";
import { FaLocationDot, FaIndianRupeeSign, FaPerson, FaPersonDress } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import "./Searchbar.scss";
import HeroImage from '../../assets/images/HeroImg.jpg';

const typeOptions = [
  { label: "Men", value: "rent", icon: <FaPerson /> },
  { label: "Women", value: "buy", icon: <FaPersonDress /> },
];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "rent",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleTypeChange = (event) => {
    setQuery((prev) => ({ ...prev, type: event.target.value }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const currentIcon = typeOptions.find(option => option.value === query.type)?.icon;

  return (
    <div className="searchBar" style={{ backgroundImage: `url(${HeroImage})` }}>
      <div className="overlay">
        <form className="searchForm">
          <div className="input-group dropdown-group">
            {currentIcon}
            <select
              value={query.type}
              onChange={handleTypeChange}
              name="type"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="divider" />
          <div className="input-group">
            <FaLocationDot />
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              value={query.city}
            />
          </div>
          <div className="divider" />
          <div className="input-group">
            <FaIndianRupeeSign />
            <input
              type="number"
              name="minPrice"
              min={0}
              max={10000000}
              placeholder="Min Price"
              onChange={handleChange}
              value={query.minPrice}
            />
          </div>
          <div className="divider" />
          <div className="input-group">
            <FaIndianRupeeSign />
            <input
              type="number"
              name="maxPrice"
              min={0}
              max={10000000}
              placeholder="Max Price"
              onChange={handleChange}
              value={query.maxPrice}
            />
          </div>
          <Link
            to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          >
            <button className="search-btn">Search</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
