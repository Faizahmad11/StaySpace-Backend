import React from "react";
import { useLocation, Link } from "react-router-dom";

const BackToHomeButton = () => {
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === "/") return null;

  return (
    <div className="back-home-container">
      <Link to="/" className="back-home-btn">
        ← Back to Home
      </Link>
    </div>
  );
};

export default BackToHomeButton;
