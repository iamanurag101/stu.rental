import { useState } from "react";
import { FaLocationDot, FaIndianRupeeSign, FaPerson, FaPersonDress } from 'react-icons/fa6';
import "./Searchbar.scss";
import HeroImage from '../../assets/images/HeroImg.jpg';

const genderOptions = [
  { label: "Men", icon: <FaPerson /> },
  { label: "Women", icon: <FaPersonDress /> },
];

function SearchBar() {
  const [query, setQuery] = useState({
    gender: "Men",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const handleGenderChange = (event) => {
    setQuery((prev) => ({ ...prev, gender: event.target.value }));
  };

  const currentIcon = genderOptions.find(option => option.label === query.gender)?.icon;

  return (
    <div className="searchBar" style={{ backgroundImage: `url(${HeroImage})` }}>
      <div className="overlay">
      <form className="searchForm">
        <div className="input-group dropdown-group">
          {currentIcon}
          <select
            value={query.gender}
            onChange={handleGenderChange}
          >
            {genderOptions.map((option) => (
              <option key={option.label} value={option.label}>
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
            name="location"
            placeholder="Location"
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
          />
        </div>
        <button className="search-btn">Search</button>
      </form>
      </div>
    </div>
  );
}

export default SearchBar;
