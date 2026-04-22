import React, { useState, useEffect, useRef } from "react";
import heroBg from "../assets/imgi_24_1583228392669.jpg";

/* 🔹 EXTENDED DATA FOR SUGGESTIONS */
const areaSuggestions = [
  "Gulshan, Karachi", "DHA, Karachi", "North Nazimabad, Karachi",
  "Johar Town, Lahore", "Gulberg, Lahore", "DHA, Lahore", "Model Town, Lahore",
  "F-7, Islamabad", "G-11, Islamabad", "Blue Area, Islamabad", "E-11, Islamabad",
  "Gulgasht, Multan", "Bosan Road, Multan"
];

export default function Part1() {
  const [filters, setFilters] = useState({ location: "", type: "", rent: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  /* 🔹 HANDLE CLICK OUTSIDE SUGGESTIONS */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* 🔹 INPUT CHANGE WITH AUTO-SUGGEST */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    if (name === "location" && value.length > 0) {
      const filtered = areaSuggestions.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (city) => {
    setFilters({ ...filters, location: city });
    setShowSuggestions(false);
  };

  return (
    <section className="hero-wrapper">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }}></div>
      <div className="hero-overlay"></div>

      <div className="hero-container">
        <h1 className="hero-heading">
          <span>Find Your Perfect Stay</span> in Pakistan’s Most Popular Cities
        </h1>

        <p className="hero-text">
          Discover hostels, flats, and rooms near you — affordable, verified, and hassle-free.
        </p>

        {/* 🔍 SEARCH PANEL */}
        <div className="hero-search">
          
          {/* LOCATION WITH YOUTUBE-STYLE SUGGESTIONS */}
          <div className="hero-field" ref={suggestionRef}>
            <i className="fa-solid fa-location-dot"></i>
            <input
              className="hero-input"
              name="location"
              placeholder="City or Area"
              value={filters.location}
              onChange={handleChange}
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="search-suggestions">
                {suggestions.map((s, i) => (
                  <li key={i} onClick={() => selectSuggestion(s)}>
                    <i className="fa-solid fa-clock-rotate-left"></i> {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* PROPERTY TYPE (FYP SPECIFIC) */}
          <div className="hero-field">
            <i className="fa-solid fa-users"></i>
            <select className="hero-select" name="type" value={filters.type} onChange={handleChange}>
              <option value="">Who are you?</option>
              <option value="Solo">Student / Solo Traveler</option>
              <option value="Couple">Couple / Small Family</option>
              <option value="Family">Kids Friendly / Large Family</option>
              <option value="Senior">Senior Citizens (Peaceful)</option>
            </select>
          </div>

          {/* RENT FILTER */}
          <div className="hero-field">
            <i className="fa-solid fa-tags"></i>
            <select className="hero-select" name="rent" value={filters.rent} onChange={handleChange}>
              <option value="">Max Budget</option>
              <option value="10000">Under 10k</option>
              <option value="20000">Under 20k</option>
              <option value="50000">Under 50k</option>
              <option value="100000">Luxury (100k+)</option>
            </select>
          </div>

          <button className="hero-btn">
            <i className="fa-solid fa-magnifying-glass"></i> Search
          </button>
        </div>

        {/* 🌆 POPULAR CITIES */}
        <div className="hero-cities">
          <h5>Quick Search Cities</h5>
   <div className="hero-city-list">
  {["Karachi", "Lahore", "Islamabad", "Multan"].map((city) => {
    
    // 1. Aik "Map" banayen jo City name ko aapki CSS class se jore
    const cityClassMap = {
      "Karachi": "khi",
      "Lahore": "lhr",
      "Islamabad": "isb",
      "Multan": "mnt"
    };

    // 2. City name ke mutabiq class nikalen
    const cityClass = cityClassMap[city];

    return (
      <button
        key={city}
        className={`hero-city city-${cityClass}`}
        onClick={() => setFilters({ ...filters, location: city })}
      >
        {city}
      </button>
    );
  })}
</div>
        </div>
      </div>
    </section>
  );
}