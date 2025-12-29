import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

const Whatapp = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappNumber = "923275500115";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20I%20want%20to%20know%20more%20about%20your%20services`;

  return (
    <div className="floating-buttons">
      {visible && (
        <button onClick={scrollToTop} className="scroll-top-btn">
          <FaArrowUp />
        </button>
      )}

      <div
        className="whatsapp-wrapper"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          <FaWhatsapp />
        </a>
        {hovered && <div className="whatsapp-tooltip">💬 Chat with us</div>}
      </div>
    </div>
  );
};

export default Whatapp;
