import React, { useState } from "react";

const faqs = [
  {
    question: "Why Choose StaySpace for Student Accommodation?",
    answers: [
      "StaySpace offers verified and secure student housing options across multiple cities.",
      "Our support team is available 24/7 to guide you through booking and moving in.",
      "All listings are inspected to ensure safety, comfort, and affordability.",
      "We provide easy online booking with transparent pricing and no hidden fees."
    ]
  },
  {
    question: "What Types Of Student Accommodations Are Available?",
    answers: [
      "Private studios with complete independence and privacy.",
      "Shared apartments where you share common areas but have your own bedroom.",
      "Ensuite rooms with private bathrooms and shared kitchens.",
      "Full student housing blocks with premium amenities like gyms and study lounges."
    ]
  },
  {
    question: "How to Book Student Accommodation with StaySpace?",
    answers: [
      "Search for your city or university on the StaySpace website.",
      "Select your preferred room type from verified listings.",
      "Submit a booking request and upload required documents.",
      "Receive confirmation and finalize your accommodation with secure payment."
    ]
  },
  {
    question: "How to Find Student Apartments Online?",
    answers: [
      "Use advanced filters such as budget, distance, amenities, and room type.",
      "Check property photos, reviews, and detailed descriptions.",
      "Shortlist your favorite apartments and compare features easily.",
      "Chat with our support team if you need personalized recommendations."
    ]
  },
  {
    question: "How Can I Find Student Accommodation Close To My University?",
    answers: [
      "Type your university name in the StaySpace search bar.",
      "Apply distance filters such as 5 mins, 10 mins, or walking distance.",
      "View the map feature to see the exact location of each property.",
      "Choose from properties closest to your campus with commute times shown."
    ]
  },
  {
    question: "What Does My Student Room Rent Comprise?",
    answers: [
      "Most accommodations include electricity, heating, and water bills.",
      "High-speed WiFi and maintenance services are usually covered.",
      "Access to shared amenities like gyms, study rooms, and laundry facilities.",
      "Some properties also include security, cleaning, and community events."
    ]
  }
];

export default function Partnine() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-wrapper">
      <h1 className="faq-title">Student Accommodation FAQs</h1>

      <div className="faq-container">
        {faqs.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{item.question}</span>
              <span className={`faq-icon ${openIndex === index ? "rotate" : ""}`}>
                ▼
              </span>
            </div>

            {openIndex === index && (
              <div className="faq-answer">
                {item.answers.map((ans, i) => (
                  <p key={i}>{ans}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}