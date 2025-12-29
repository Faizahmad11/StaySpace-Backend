import React from "react";
import step1 from "../assets/step1.jpg.jpg";
import step2 from "../assets/step2.jpg.jpg";
import step3 from "../assets/step3.jpg.jpg";

function Partthree() {
  return (
    <div className="partthree-container">

      {/* ✅ Heading Section */}
      <h2 className="pt-title">
        How StaySpace Makes Student Housing Easy in Pakistan
      </h2>
      <p className="pt-subtitle">
        Our goal is to make student accommodation across Pakistan simple,
        reliable, and stress-free. Explore, book, and move into your ideal place
        — all without hassle.
      </p>

      {/* ✅ 3 Steps Section */}
      <div className="pt-steps-wrapper">

        <div className="pt-step-box">
          <div className="pt-circle-img">
            <img src={step1} alt="Step 1" />
          </div>
          <h3>Browse Listings & Book Online</h3>
          <p>Search verified rooms and hostels across Pakistan with 100% transparency.</p>
        </div>

        <div className="pt-step-box">
          <div className="pt-circle-img">
            <img src={step2} alt="Step 2" />
          </div>
          <h3>Landlord Confirmation Within 24–48 Hours</h3>
          <p>Your booking is quickly processed with trusted property partners.</p>
        </div>

        <div className="pt-step-box">
          <div className="pt-circle-img">
            <img src={step3} alt="Step 3" />
          </div>
          <h3>Move In & Enjoy Your Experience</h3>
          <p>Smooth check-in, safe stay, and a comfortable student life.</p>
        </div>

      </div>
    </div>
  );
}

export default Partthree;
