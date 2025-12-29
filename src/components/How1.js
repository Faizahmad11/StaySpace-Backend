import React from "react";
import bannerImg from "../assets/bgc1.jpg";
import stepsImg from "../assets/p-14.webp";

const HowItWorks = () => {
  return (
    <div className="hiw-wrapper">

      {/* ===== First Banner ===== */}
      <section className="hiw-banner">
        <img src={bannerImg} alt="How It Works Banner" className="hiw-banner-img" />
        <div className="hiw-banner-overlay"></div>
        <h1 className="hiw-banner-title">How It Works</h1>
      </section>

      {/* ===== Second Banner (Steps as Banner) ===== */}
      <section className="hiw-steps-banner">
        <img src={stepsImg} alt="Steps Banner" className="hiw-steps-banner-img" />
        <div className="hiw-steps-banner-overlay"></div>
        <div className="hiw-steps-banner-text">
          <h3>Smart Living. Secure Choices.</h3>
          <h2>Your Next Home Awaits.</h2>
        </div>
      </section>

      {/* ===== Text Content ===== */}
      <section className="hiw-text">
        <p>
          StaySpace makes renting simple, transparent, and stress-free. Whether
          you're a student or a young professional, our platform connects you
          directly with verified property owners.
        </p>
        <p>
          No middlemen. No hidden charges. Just smart, secure, and fast booking.
        </p>
        <p>
          Browse listings, compare amenities, check reviews, and book your next
          home—all in a few clicks.
        </p>
      </section>

    </div>
  );
};

export default HowItWorks;
