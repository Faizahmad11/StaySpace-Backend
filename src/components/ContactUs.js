import React, { useState } from "react";
import bgc1 from "../assets/bgc1.jpg";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // EmailJS: send the form
    emailjs
      .send(
        "YOUR_SERVICE_ID",      // replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID",     // replace with your EmailJS template ID
        formData,
        "YOUR_PUBLIC_KEY"       // replace with your EmailJS public key
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="contact-main">
      {/* TOP BANNER */}
      <div
        className="contact-banner"
        style={{ backgroundImage: `url(${bgc1})` }}
      >
        <h1>Contact Us</h1>
      </div>

      {/* CONTENT */}
      <div className="contact-container">
        {/* LEFT FORM */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button className="submit-btn" type="submit">
              Submit Request
            </button>
          </form>
        </div>

        {/* RIGHT DETAILS */}
        <div className="contact-info">
          <h2>Get In Touch</h2>

          <div className="info-box">
            <h4>Call Us</h4>
            <p>+92 327 5500115</p>
          </div>

          <div className="info-box">
            <h4>Email</h4>
            <p>StaySpace11@gmail.com</p>
          </div>

          <div className="info-box">
            <h4>Address</h4>
            <p>Lahore, Pakistan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
