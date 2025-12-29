import React from "react";
import preloader from "../assets/ChatGPT Image Nov 2, 2025, 07_26_47 PM.png";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader-content">
        <img src={preloader} alt="StaySpace Loading" className="preloader-logo" />
        <h2 className="preloader-text">Loading StaySpace...</h2>
      </div>
    </div>
  );
}

export default Preloader;
