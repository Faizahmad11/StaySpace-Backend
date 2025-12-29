import React, { useState } from "react";
import heroBg from "../assets/imgi_24_1583228392669.jpg";

const propertiesData = [];

export default function Part1() {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    rent: "",
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const filtered = propertiesData.filter((p) => {
      const matchLocation =
        filters.location === "" ||
        p.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.area.toLowerCase().includes(filters.location.toLowerCase());
      const matchType = filters.type === "" || p.type === filters.type;
      const matchRent = filters.rent === "" || p.rent <= parseInt(filters.rent);
      return matchLocation && matchType && matchRent;
    });

    setResults(filtered);
  };

  return (
    <section
      className="hero-section text-center"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay"></div>

      <div className="hero-content container">
        <h1 className="hero-title mb-4">
          <span>Find Your Perfect Stay</span> in Pakistan’s Most Popular Cities
        </h1>
        <p className="hero-subtitle">
          Discover hostels, flats, and rooms near you — stylish, affordable, and easy to find.
        </p>

        {/* ===== SEARCH BOX ===== */}
        <div className="search-box">
          {/* Location */}
          <div className="input-with-icon">
            <i className="fa-solid fa-location-dot search-icon"></i>
            <input
              type="text"
              name="location"
              className="search-input"
              placeholder="Enter Area or City"
              value={filters.location}
              onChange={handleChange}
            />
          </div>

          {/* Property Type */}
          <div className="select-wrapper">
            <i className="fa-solid fa-building select-icon"></i>
            <select
              name="type"
              className="search-select"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="">Property Type</option>
              <option>Flat / Room</option>
              <option>PG / Hostel</option>
              <option>Dormitory</option>
              <option>Ladies Hostel</option>
              <option>Mess</option>
            </select>
          </div>

          {/* Rent */}
          <div className="input-with-icon">
            <i className="fa-solid fa-money-bill-wave search-icon"></i>
            <input
              type="number"
              name="rent"
              className="search-input"
              placeholder="Max Rent (PKR)"
              value={filters.rent}
              onChange={handleChange}
            />
          </div>

          {/* Button */}
          <button className="explore-btn" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
        </div>

        {/* ===== POPULAR CITIES ===== */}
        <div className="popular-cities mt-5">
          <h5 className="city-heading text-light">Popular Cities</h5>
          <div className="city-buttons">
            <button className="city-btn karachi">Karachi</button>
            <button className="city-btn lahore">Lahore</button>
            <button className="city-btn islamabad">Islamabad</button>
            <button className="city-btn multan">Multan</button>
          </div>
        </div>
      </div>
    </section>
  );
}
