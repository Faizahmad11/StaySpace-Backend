import React, { useState } from "react";
import heroBg from "../assets/imgi_24_1583228392669.jpg";

/* 🔹 TEMP DEMO DATA (replace with API later) */
const propertiesData = [
  {
    id: 1,
    city: "Karachi",
    area: "Gulshan",
    type: "Flat / Room",
    rent: 25000,
  },
  {
    id: 2,
    city: "Lahore",
    area: "Johar Town",
    type: "PG / Hostel",
    rent: 18000,
  },
  {
    id: 3,
    city: "Islamabad",
    area: "G-11",
    type: "Dormitory",
    rent: 15000,
  },
];

export default function Part1() {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    rent: "",
  });

  const [results, setResults] = useState([]);

  /* 🔹 INPUT CHANGE */
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  /* 🔹 SEARCH LOGIC */
  const handleSearch = (customLocation) => {
    const locationValue = customLocation ?? filters.location;

    const filtered = propertiesData.filter((p) => {
      const matchLocation =
        locationValue === "" ||
        p.city.toLowerCase().includes(locationValue.toLowerCase()) ||
        p.area.toLowerCase().includes(locationValue.toLowerCase());

      const matchType =
        filters.type === "" || p.type === filters.type;

      const matchRent =
        filters.rent === "" || p.rent <= Number(filters.rent);

      return matchLocation && matchType && matchRent;
    });

    setResults(filtered);
  };

  return (
    <section className="hero-wrapper">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>
      <div className="hero-overlay"></div>

      <div className="hero-container">
        <h1 className="hero-heading">
          <span>Find Your Perfect Stay</span> in Pakistan’s Most Popular Cities
        </h1>

        <p className="hero-text">
          Discover hostels, flats, and rooms near you — affordable, verified, and hassle-free.
        </p>

        {/* 🔍 SEARCH */}
        <div className="hero-search">
          <div className="hero-field">
            <i className="fa-solid fa-location-dot"></i>
            <input
              className="hero-input"
              name="location"
              placeholder="City or Area"
              value={filters.location}
              onChange={handleChange}
            />
          </div>

          <div className="hero-field">
            <i className="fa-solid fa-building"></i>
            <select
              className="hero-select"
              name="type"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="">Property Type</option>
              <option>Flat / Room</option>
              <option>PG / Hostel</option>
              <option>Dormitory</option>
            </select>
          </div>

          <div className="hero-field">
            <i className="fa-solid fa-money-bill-wave"></i>
            <input
              type="number"
              className="hero-input"
              name="rent"
              placeholder="Max Rent (PKR)"
              value={filters.rent}
              onChange={handleChange}
            />
          </div>

          <button className="hero-btn" onClick={() => handleSearch()}>
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
        </div>

        {/* 🌆 POPULAR CITIES */}
        <div className="hero-cities">
          <h5>Popular Cities</h5>
          <div className="hero-city-list">
            <button
              className="hero-city city-karachi"
              onClick={() => handleSearch("Karachi")}
            >
              Karachi
            </button>
            <button
              className="hero-city city-lahore"
              onClick={() => handleSearch("Lahore")}
            >
              Lahore
            </button>
            <button
              className="hero-city city-isb"
              onClick={() => handleSearch("Islamabad")}
            >
              Islamabad
            </button>
            <button
              className="hero-city city-multan"
              onClick={() => handleSearch("Multan")}
            >
              Multan
            </button>
          </div>
        </div>

        {/* 📊 SEARCH RESULT COUNT */}
        {results.length > 0 && (
          <p style={{ marginTop: "20px", color: "#fff" }}>
            {results.length} properties found
          </p>
        )}
      </div>
    </section>
  );
}
