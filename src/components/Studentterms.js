import React, { useState } from "react";
import imagebgc from "../assets/bgc1.jpg";

const Studentterms = () => {

  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="terms-page">

      {/* HERO SECTION */}
      <div
        className="terms-hero"
        style={{ backgroundImage: `url(${imagebgc})` }}
      >
        <div className="overlay">
          <h1>Terms & Conditions</h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="terms-container">

        {/* BUTTONS */}
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

        {/* TERMS CONTENT */}
        <div className="terms-content">

          <h2>Terms & Conditions</h2>

          <p className="date">
            Posted as of 06 February 2020 <br />
            Last updated as of 06 February 2020
          </p>

          {activeTab === "student" && (
            <>
              <h3>Welcome to StaySpace Property Solution Private Limited</h3>

              <p>
                We, STAYSPACE PROPERTY SOLUTION PRIVATE LIMITED,
                ensure a steady commitment to your usage of the Platform
                and privacy with regard to protection of your valuable
                information.
              </p>

              <p>
                These Terms govern your use of the platform connecting
                students looking for accommodation with property owners
                directly while helping them save brokerage fees.
              </p>

              <h4>Registration</h4>
              <p>
                Registration is mandatory to access services. Users must
                provide accurate information and maintain confidentiality
                of login credentials.
              </p>

              <h4>Platform Overview</h4>
              <p>
                The platform acts as an online marketplace connecting
                students and property owners for rental accommodation.
              </p>

              <h4>Eligibility</h4>
              <p>
                Users must be above 18 years and legally capable of
                entering binding contracts.
              </p>
            </>
          )}

          {activeTab === "landlord" && (
            <>
              <h3>Landlord Terms</h3>

              <p>
                Property owners registering on StaySpace agree to provide
                accurate property details and comply with all applicable
                rental laws and regulations.
              </p>

              <h4>Listing Responsibility</h4>
              <p>
                Owners are responsible for accuracy of listings including
                rent, images, and property description.
              </p>

              <h4>Payments</h4>
              <p>
                Rental payments and service fees shall follow platform
                payment policies and agreed conditions.
              </p>

              <h4>Conduct</h4>
              <p>
                Landlords must maintain fair dealings with students and
                avoid misleading or fraudulent activity.
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Studentterms;