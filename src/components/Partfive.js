import React from "react";
import { Link} from "react-router-dom"; // useNavigate add kiya professional logic ke liye

export default function Partfive() {
  

  const handleButtonClick = (e) => {
    // Pehle alert dikhayen
    alert("Your listing form will open here.");
    // Phir navigate karen (Optionally agar Link use nahi karna to)
  };

  return (
    <section className="partfive-section">
      <div className="partfive-container">
        <p className="top-text">Are You A Landlord Looking For Students In Pakistan?</p>

        <h2>
          List Your Property With The Best Student Accommodation Platform In Pakistan
        </h2>

        <p className="description">
          Every year, thousands of students in Pakistan search for safe, affordable,
          and convenient accommodation. Are you looking to rent out your property
          to students? Let us help you connect with verified student tenants easily
          and quickly.
        </p>

        {/* SAHI TARIQA: Link ko hi button ki class de den */}
        <Link 
          to="/listpropertyfree" 
          className="partfive-btn" 
          onClick={handleButtonClick}
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          Create your free listing now
        </Link>

      </div>
    </section>
  );
}