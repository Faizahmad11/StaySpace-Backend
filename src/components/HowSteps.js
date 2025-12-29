import React, { useState } from "react";
import stepImg from "../assets/imgi_10_1577948594881.jpg";

const steps = [
  {
    number: "1",
    title: "Search",
    subtitle: "Find the Perfect Place Using Filters",
    text: "Use StaySpace’s smart filters to browse hostels, rooms, and apartments...",
    details: "Tip: Use the university and neighborhood filter to find the best options fast!",
    img: stepImg,
  },
  {
    number: "2",
    title: "Make a Booking",
    subtitle: "Complete the Booking Request Form",
    text: "Fill in the required details and submit a booking request...",
    details: "Pro Tip: Double-check move-in dates to avoid conflicts with landlords.",
    img: stepImg,
  },
  {
    number: "3",
    title: "Get in Touch",
    subtitle: "Connect With Your Landlord",
    text: "After your booking is confirmed, StaySpace shares verified landlord details...",
    details: "Remember: Always communicate through StaySpace for verified info.",
    img: stepImg,
  },
  {
    number: "4",
    title: "Experience Comfort",
    subtitle: "Shift In & Start Living",
    text: "Move into your new place with confidence...",
    details: "Tip: Keep all your booking info handy for smooth check-in.",
    img: stepImg,
  },
];

export default function HowSteps() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  const openModal = (step) => {
    setActiveStep(step);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveStep(null);
  };

  return (
    <div className="how-container">
      <h1 className="how-main-title">Easy Steps To Book on StaySpace</h1>

      {steps.map((step, index) => (
        <div
          className={`how-step-section ${index % 2 === 0 ? "left" : "right"}`}
          key={index}
        >
          <div className="how-img-box">
            <img src={step.img} alt="step-img" />
          </div>

          <div className="how-text-box">
            <h1 className="step-number">{step.number}</h1>
            <h2 className="step-title">{step.title}</h2>
            <h3 className="step-subtitle">{step.subtitle}</h3>
            <p className="step-desc">{step.text}</p>
            <button className="step-btn" onClick={() => openModal(step)}>
              Learn More
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {modalOpen && activeStep && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{activeStep.title}</h2>
            <p>{activeStep.details}</p>
            <button className="step-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
