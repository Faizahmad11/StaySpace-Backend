import React from "react";
import bgc1 from "../assets/bgc1.jpg";

const AboutUS = () => {
  return (
    <section className="about-page">

      {/* HERO SECTION */}
      <div className="about-hero">
        <img src={bgc1} alt="About StaySpace" />
        <h1 className="about-hero-title">About Us</h1>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className="about-section">
        <div className="about-body">

          {/* Introduction */}
          <h2 className="about-heading">Who We Are</h2>
          <p>
            StaySpace is a modern, intuitive digital platform created to revolutionize
            how students and young professionals find rental accommodation. Our mission
            is to provide a safe, verified, and budget-friendly living experience.
          </p>

          {/* The Problem */}
          <h2 className="about-heading">The Challenge</h2>
          <p>
            Searching for accommodation often involves unreliable listings, hidden charges,
            and unsafe environments. Traditional methods can be stressful, time-consuming,
            and expensive, making it hard for users to find the right space.
          </p>

          {/* Our Solution */}
          <h2 className="about-heading">Our Solution</h2>
          <p>
            StaySpace bridges the gap between tenants and property owners. By eliminating
            brokers and commissions, we provide a transparent platform. Users can explore
            hostels, rooms, shared spaces, and apartments with real images, verified
            amenities, and reviews.
          </p>
          <p>
            Property owners benefit from a dedicated dashboard to manage listings, monitor
            tenant interest, and access verified user information. This approach reduces
            manual effort and ensures genuine connections.
          </p>

          {/* Our Vision */}
          <h2 className="about-heading">Our Vision</h2>
          <p>
            We aim to build a trusted, centralized, and user-friendly accommodation
            ecosystem. StaySpace focuses on reliability, modern design, and a seamless
            experience so users can make informed decisions without stress or uncertainty.
          </p>

          {/* Taglines */}
          <h3 className="about-tagline">
            Smart Living. Trusted Spaces.
          </h3>
          <h2 className="about-tagline-main">
            StaySpace — Find Your Space, Find Your Peace.
          </h2>

        </div>
      </div>

    </section>
  );
};

export default AboutUS;
