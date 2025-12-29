import React from "react";
import bgc1 from "../assets/bgc1.jpg";

const AboutUS = () => {
  return (
    <div className="about-container">
      <div className="about-banner">
        <img src={bgc1} alt="banner" className="about-img" />
        <h1 className="about-title">About Us</h1>
      </div>

      <div className="about-content">
      <p>
  StaySpace is a modern and intuitive digital platform developed as part of our 
  Final Year Project, aiming to revolutionize how students and young professionals 
  discover rental accommodation. In today's fast-paced world, finding a safe, 
  verified, and budget-friendly living space often becomes a major challenge. 
  Issues like unreliable listings, hidden charges, and unsafe environments make 
  the search even more difficult. StaySpace has been designed to eliminate these 
  problems through a secure, transparent, and technology-driven solution.
</p>

<p>
  Our platform creates a direct connection between tenants and property owners, 
  removing the need for brokers and expensive commissions. This ensures complete 
  transparency while keeping the entire process affordable. With detailed listings, 
  real images, amenities, reviews, and location-based search, StaySpace enables 
  users to explore hostels, rooms, shared spaces, and apartments with complete 
  confidence.
</p>

<p>
  Property owners also benefit from a dedicated dashboard, allowing them to 
  publish listings, manage availability, track tenant interest, and access 
  verified user information. This digital approach reduces manual effort and makes 
  it significantly easier for owners to reach genuine tenants without relying on 
  traditional methods.
</p>

<p>
  The purpose behind StaySpace is to build a safe, centralized, and user-friendly 
  accommodation ecosystem. Our focus is on trust, reliability, modern design, and 
  a seamless user experience — ensuring that students can make informed decisions 
  about where they live, without stress or uncertainty.
</p>

<h3 className="tagline">Smart Living. Trusted Spaces.</h3>
<h2 className="tagline2">StaySpace — Find Your Space, Find Your Peace.</h2>

      </div>
    </div>
  );
};

export default AboutUS;
