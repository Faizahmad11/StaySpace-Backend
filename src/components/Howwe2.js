import React, { useEffect } from "react";
import stepImg1 from "../assets/imgi_10_1577948594881.jpg";
import stepImg2 from "../assets/imgi_10_1577948594881.jpg";
import stepImg3 from "../assets/imgi_10_1577948594881.jpg";
import stepImg4 from "../assets/imgi_10_1577948594881.jpg";
import banner from "../assets/bgc1.jpg";
import { Link } from "react-router-dom";


const Howwe2 = () => {
  const steps = [
    {
      number: "1",
      title: "Create Your Listing Free",
      desc: "Add your property with rent, location, and house rules. Upload clear photos for better visibility and more bookings.",
      img: stepImg1,
    },
    {
      number: "2",
      title: "Reply to Booking Requests",
      desc: "StaySpace alerts you instantly. Respond fast for a higher response score and more trusted visibility.",
      img: stepImg2,
    },
    {
      number: "3",
      title: "Meet & Verify Tenant",
      desc: "Connect directly with verified tenants. No middleman, no hidden fees — just smooth communication.",
      img: stepImg3,
    },
    {
      number: "4",
      title: "Finalize & Earn",
      desc: "Complete the booking and start earning. Keep your listing active to get more weekly leads.",
      img: stepImg4,
    },
  ];

  // ----- Scroll Animation -----
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="how-container">
      {/* Banner */}
      <div className="how-banner">
        <img src={banner} alt="banner" className="how-banner-img" />
        <div className="how-overlay"></div>
        <h1 className="how-title">How StaySpace Works</h1>
      </div>

      {/* Steps Section */}
      <div className="steps-wrapper">
        {steps.map((s, index) => (
          <div className="step-box animate-on-scroll" key={index}>
            <div className="step-left">
              <img src={s.img} alt="" className="step-img" />
            </div>

            <div className="step-right">
              <h1 className="step-number">{s.number}</h1>
              <h2 className="step-title">{s.title}</h2>
              <p className="step-desc">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

<div className="cta-footer">
  <Link to="/listpropertyfree" className="cta-btn">
    List Your Property on StaySpace
  </Link>

  <div className="how-hashtags">
    #StaySpace #SmartLiving #RentEasy #PropertyListing<br />
    #StudentHousing #BookYourRoom #HostelFinder
  </div>
</div>

    
    </div>
  );
};

export default Howwe2;
