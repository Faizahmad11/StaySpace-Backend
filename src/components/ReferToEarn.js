import React from "react";

export default function ReferToEarn() {
  return (
    <div className="refer-container">
      <div className="refer-card">
        <div className="spotlight"></div>

        <h2 className="refer-title">
          Refer & Earn <span>₹500</span> Instantly!
        </h2>

        <p className="refer-sub">
          Invite your friends to StaySpace and earn exciting rewards on every successful signup.
        </p>

        <div className="refer-box">
          <input
            type="text"
            className="refer-input"
            value="https://stayspace.pk/ref/faiz123"
            readOnly
          />
          <button className="copy-btn">
            <i className="fa-solid fa-copy"></i>
          </button>
        </div>

        <button className="refer-main-btn">
          <i className="fa-solid fa-share-nodes"></i> Share Invite Link
        </button>

        <div className="benefits">
          <div className="benefit-item">
            <i className="fa-solid fa-user-plus"></i>
            <p>Invite Friends</p>
          </div>
          <div className="benefit-item">
            <i className="fa-solid fa-coins"></i>
            <p>They Sign Up</p>
          </div>
          <div className="benefit-item">
            <i className="fa-solid fa-sack-dollar"></i>
            <p>You Get Paid</p>
          </div>
        </div>
      </div>
    </div>
  );
}
