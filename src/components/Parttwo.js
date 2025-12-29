import React, { useEffect, useState } from "react";
import googlelogo from "../assets/imgi_34_GoogleReviews.png";

function Parttwo() {
  const cities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Multan",
    "Faisalabad",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Bahawalpur",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cities.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="parttwo-container">

      {/* ✅ Cards Wrapper */}
      <div className="cards-wrapper">

        {/* ✅ Left Card */}
        <div className="left-card">
          <h2>
            Moving to <span className="rotate-text">{cities[index]}</span>?  
            StaySpace Has Everything You Need.
          </h2>
          <p>
            From hostel kits to guarantor services, StaySpace provides all essential
            items for students relocating across Pakistan.
          </p>
          <button className="btn-purple">Explore Essentials</button>
        </div>

        {/* ✅ Right Card */}
        <div className="right-card improved-right-card">
          <h2 className="rc-title">Looking For Short Stays?</h2>
          <p className="rc-desc">
            Discover flexible, premium, and budget-friendly student stays with
            <strong> StaySpace Flex</strong>.
          </p>
          <button className="btn-red pro-red-btn">Browse Properties →</button>
        </div>

      </div> 
      {/* ✅ END cards-wrapper */}

{/* ✅ Stats Section */}
<div className="stats-area">

  <div className="stat-box">
    <h1>5K+</h1>
    <p>Rooms</p>
  </div>

  <div className="stat-box">
    <h1>500+</h1>
    <p>Properties</p>
  </div>

  <div className="stat-box">
    <h1>40+</h1>
    <p>Cities</p>
  </div>

  {/* ✅ New Card beside Google Logo */}
<div className="stat-box trusted-card">
  <i className="fa-solid fa-shield-halved trusted-icon"></i>
  <h3>Trusted by Thousands</h3>
  <p>Across Pakistan</p>
</div>

  {/* ✅ Google Rating */}
  <div className="stat-box google-logo-box">
    <img src={googlelogo} alt="Google" className="google-mini-logo" />
  </div>

</div>

      {/* ✅ END stats-area */}

    </div>
  );
}

export default Parttwo;
