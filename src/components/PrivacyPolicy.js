import React, { useState } from "react";
import imgbgc from "../assets/bgc1.jpg";

const PrivacyPolicy = () => {

  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="privacy-wrapper">

      {/* ===== HERO SECTION ===== */}
      <div
        className="privacy-hero"
        style={{ backgroundImage: `url(${imgbgc})` }}
      >
        <div className="overlay">
          <h1>Privacy Policy</h1>
          <p>StaySpace — Your privacy matters to us</p>
        </div>
      </div>

      {/* ===== TAB BUTTONS ===== */}
      <div className="privacy-container">

        <div className="tab-buttons">
          <button
            className={activeTab === "student" ? "active" : ""}
            onClick={() => setActiveTab("student")}
          >
            Student
          </button>

          <button
            className={activeTab === "landlord" ? "active" : ""}
            onClick={() => setActiveTab("landlord")}
          >
            Landlord
          </button>
        </div>

        <p className="update-date">
          Last Updated: 06 February 2026
        </p>

        {/* ================= STUDENT POLICY ================= */}
        {activeTab === "student" && (
          <>
            <section>
              <h2>1. Introduction (Students)</h2>
              <p>
                StaySpace collects limited personal information from students
                to help them discover safe and verified accommodations.
              </p>
            </section>

            <section>
              <h2>2. Information We Collect</h2>
              <ul>
                <li>Name, email and contact number</li>
                <li>University or location preferences</li>
                <li>Search and booking activity</li>
              </ul>
            </section>

            <section>
              <h2>3. Purpose of Data Use</h2>
              <p>
                Your data helps us match you with suitable properties,
                improve recommendations, and maintain secure communication
                with landlords.
              </p>
            </section>

            <section>
              <h2>4. Student Rights</h2>
              <ul>
                <li>Request account deletion anytime</li>
                <li>Edit personal details</li>
                <li>Control communication preferences</li>
              </ul>
            </section>
          </>
        )}

        {/* ================= LANDLORD POLICY ================= */}
        {activeTab === "landlord" && (
          <>
            <section>
              <h2>1. Introduction (Landlords)</h2>
              <p>
                Landlords provide property information so students can
                find verified and trusted accommodations through StaySpace.
              </p>
            </section>

            <section>
              <h2>2. Information We Collect</h2>
              <ul>
                <li>Property listings and images</li>
                <li>Identity and verification details</li>
                <li>Contact and payment information</li>
              </ul>
            </section>

            <section>
              <h2>3. How Data is Used</h2>
              <p>
                Information is used to display listings, connect with
                students, and maintain trust and safety across the platform.
              </p>
            </section>

            <section>
              <h2>4. Responsibilities</h2>
              <ul>
                <li>Provide accurate listing details</li>
                <li>Maintain truthful property information</li>
                <li>Follow platform safety guidelines</li>
              </ul>
            </section>
          </>
        )}

        {/* ===== COMMON SECTION ===== */}
        <section>
          <h2>Contact Us</h2>
          <p>
            Questions? Reach us anytime:
            <br />
            <strong>Email:</strong> support@stayspace.com
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;