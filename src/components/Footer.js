import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email || !name) {
      alert("Please enter your name and email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
      } else {
        alert("✅ Greeting email sent successfully!");
        setEmail("");
        setName("");
      }
    } catch {
      alert("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="/howwework">How We Work</a></li>
            <li><a href="/Contactus">Contact Us</a></li>
            <li><a href="/Support">Support</a></li>
            <li><a href="/Careers">Careers</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/Termsconditions">Terms & Conditions</a></li>
            <li><a href="/Privacy">Privacy Policy</a></li>
            <li><a href="/Refund">Refund Policy</a></li>
            <li><a href="/Blogs">Blog</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Get in Touch</h3>
          <p><HiOutlineMail /> StaySpace11@gmail.com</p>
          <p><HiOutlinePhone /> +92 327 5500115</p>
        </div>

        {/* Social + Newsletter */}
        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>

          <div className="newsletter">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={handleSend} disabled={loading}>
              {loading ? "Sending..." : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 StaySpace. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;