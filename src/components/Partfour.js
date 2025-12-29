import React, { useRef, useState, useEffect } from "react";

import karachi from "../assets/images/karachi.jpg";
import lahore from "../assets/images/lahore.jpg";
import islamabad from "../assets/images/islamabad.jpg";
import rawalpindi from "../assets/images/Rawalpindi.jpg";
import multan from "../assets/images/Multan.jpg";
import faisalabad from "../assets/images/Faisalabad.jpg";
import peshawar from "../assets/images/Peshawar.jpg";
import quetta from "../assets/images/Quetta.jpg";
import gujranwala from "../assets/images/Gujranwala.jpg";
import sialkot from "../assets/images/Sialkot.jpg";
import hyderabad from "../assets/images/Hyderabad.jpg";
import bahawalpur from "../assets/images/Bahawalpur.jpg";
import sukkur from "../assets/images/Sukkur.jpg";
import sahiwal from "../assets/images/Sahiwal.jpg";
import mardan from "../assets/images/Mardan.jpg";
import kohat from "../assets/images/Kohat.jpg";
import mirpur from "../assets/images/Mirpur.jpg";
import okara from "../assets/images/Okara.jpg";
import gojra from "../assets/images/Gojra.jpg";
import jhang from "../assets/images/Jhang.jpg";
import Abbottabad from "../assets/images/Abbottabad.jpg";
import Chiniot from "../assets/images/Chiniot.jpg";
import DeraIsmailKhan from "../assets/images/Dera Ismail Khan.jpg";        
import Gujrat from "../assets/images/Gujrat.jpg";
import Kharian from "../assets/images/Kharian.jpg";
import Sadiqabad from "../assets/images/Sadiqabad.jpg";
import RahimYarKhan from "../assets/images/RahimYarKhan.jpg";
import Kotri from "../assets/images/Kotri.jpg"; 
import NankanaSahib from "../assets/images/NankanaSahib.jpg";
import MandiBahauddin from "../assets/images/MandiBahauddin.jpg";
import Haripur from "../assets/images/Haripur.jpg";
import Chitral from "../assets/images/Chitral.jpg";
import Swat from "../assets/images/Swat.jpg";
import Karak from "../assets/images/Karak.jpg";
import Jacobabad from "../assets/images/Jacobabad.jpg";
import Thatta from "../assets/images/Thatta.jpg";
import Shikarpur from "../assets/images/Shikarpur.jpg";
import Kohlu from "../assets/images/Kohlu.jpg";
import Bannu from "../assets/images/Bannu.jpg";
import Chaman from "../assets/images/Chaman.jpg";
import Muzaffargarh from "../assets/images/Muzaffargarh.jpg";
import Larkana from "../assets/images/Larkana.jpg";
import Khairpur from "../assets/images/Khairpur.jpg";
import TandoAdam from "../assets/images/TandoAdam.jpg";
import Mingora from "../assets/images/Mingora.jpg";
import Risalpur from "../assets/images/Risalpur.jpg";
import Narowal from "../assets/images/Narowal.jpg";
import Vehari from "../assets/images/Vehari.jpg";
import Pakpattan from "../assets/images/Pakpattan.jpg";

const topCities = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Multan", "Faisalabad",
  "Peshawar", "Quetta", "Gujranwala", "Sialkot", "Hyderabad", "Bahawalpur",
  "Sukkur", "Sahiwal", "Mardan", "Kohat", "Mirpur", "Okara", "Gojra", "Jhang"


];

const moreCities = [
  "Abbottabad", "Chiniot", "Dera Ismail Khan", "Gujrat", "Kharian",
  "Sadiqabad", "Rahim Yar Khan", "Kotri", "Nankana Sahib", "Mandi Bahauddin",
  "Haripur", "Chitral", "Swat", "Karak", "Jacobabad", "Thatta", "Shikarpur",
  "Kohlu", "Bannu", "Chaman", "Muzaffargarh", "Larkana", "Khairpur",
  "Tando Adam", "Mingora", "Risalpur", "Narowal", "Vehari", "Pakpattan"
];

const fullCities = Array.from(new Set([...topCities, ...moreCities]));

const cityImages = {
  Karachi: karachi,
  Lahore: lahore,
  Islamabad: islamabad,
  Rawalpindi: rawalpindi,
  Multan: multan,
  Faisalabad: faisalabad,
  Peshawar: peshawar,
  Quetta: quetta,
  Gujranwala: gujranwala,
  Sialkot: sialkot,
  Hyderabad: hyderabad,
  Bahawalpur: bahawalpur,
  Sukkur: sukkur,
  Sahiwal: sahiwal,
  Mardan: mardan,
  Kohat: kohat,
  Mirpur: mirpur,
  Okara: okara,
  Gojra: gojra,
  Jhang: jhang,

   // More Cities
  "Abbottabad": Abbottabad,
  "Chiniot": Chiniot,
  "Dera Ismail Khan": DeraIsmailKhan,
  "Gujrat": Gujrat,
  "Kharian": Kharian,
  "Sadiqabad": Sadiqabad,
  "Rahim Yar Khan": RahimYarKhan,
  "Kotri": Kotri,
  "Nankana Sahib": NankanaSahib,
  "Mandi Bahauddin": MandiBahauddin,
  "Haripur": Haripur,
  "Chitral": Chitral,
  "Swat": Swat,
  "Karak": Karak,
  "Jacobabad": Jacobabad,
  "Thatta": Thatta,
  "Shikarpur": Shikarpur,
  "Kohlu": Kohlu,
  "Bannu": Bannu,
  "Chaman": Chaman,
  "Muzaffargarh": Muzaffargarh,
  "Larkana": Larkana,
  "Khairpur": Khairpur,
  "Tando Adam": TandoAdam,
  "Mingora": Mingora,
  "Risalpur": Risalpur,
  "Narowal": Narowal,
  "Vehari": Vehari,
  "Pakpattan": Pakpattan,
};

export default function Partfour({ onCityClick }) {
  const [showAll, setShowAll] = useState(false);
  const listRef = useRef(null);
  const autoScrollRef = useRef(null);

  const scrollBy = (dir = "right") => {
    if (!listRef.current) return;
    const container = listRef.current;
    const card = container.querySelector(".city-card");
    const cardWidth = card ? card.getBoundingClientRect().width + 20 : 320;
    const scrollAmount = dir === "right" ? cardWidth * 2 : -cardWidth * 2;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Arrow key navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") scrollBy("right");
      if (e.key === "ArrowLeft") scrollBy("left");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Auto scroll with pause on hover
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => scrollBy("right"), 3000);
    };

    const stopAutoScroll = () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };

    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);

    startAutoScroll();

    return () => {
      stopAutoScroll();
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", startAutoScroll);
    };
  }, []);

  const handleCityClick = (city) => {
    const cityQuery = encodeURIComponent(city + " Pakistan");
    window.open(`https://www.google.com/maps/search/${cityQuery}`, "_blank");
  };

  return (
    <section className="partfour-wrap">
      <div className="pf-header">
        <h2>Popular Destinations in Pakistan</h2>
        <p className="pf-sub">Click any city to explore it on Google Maps.</p>
      </div>

      {!showAll && (
        <>
          <div className="pf-controls">
            <div className="pf-tabs">
              <button className="pf-tab active">Top Cities</button>
              <button className="pf-tab" onClick={() => setShowAll(true)}>
                View All Cities ({fullCities.length})
              </button>
            </div>

            <div className="pf-arrows">
              <button className="pf-arrow" onClick={() => scrollBy("left")}>‹</button>
              <button className="pf-arrow" onClick={() => scrollBy("right")}>›</button>
            </div>
          </div>

          <div className="pf-slider" ref={listRef}>
            {topCities.map((city) => (
              <article
                key={city}
                className="city-card"
                onClick={() => handleCityClick(city)}
              >
                <img
                  src={cityImages[city] || `https://source.unsplash.com/600x400/?${encodeURIComponent(city)}`}
                  alt={city}
                />
                <div className="city-badge">{city}</div>
              </article>
            ))}
          </div>
        </>
      )}

      {showAll && (
        <div className="pf-fullscreen">
          <iframe
            title="Pakistan Map"
            src="https://www.google.com/maps/embed?pb=!4v1692873920200!5m2!1sen!2sPK"
            allowFullScreen=""
            loading="lazy"
            className="pf-map"
          ></iframe>

          <div className="pf-fullscreen-inner">
            {fullCities.map((city) => (
              <div
                key={city}
                className="city-card-vertical"
                onClick={() => handleCityClick(city)}
              >
                <img
                  src={cityImages[city] || `https://source.unsplash.com/400x250/?${encodeURIComponent(city)}`}
                  alt={city}
                />
                <h3>{city}</h3>
              </div>
            ))}
          </div>

          <button className="pf-exit-btn" onClick={() => setShowAll(false)}>⬅ Back to Slider</button>
        </div>
      )}

      {!showAll && (
        <div className="pf-bottom">
          <button className="pf-cta" onClick={() => setShowAll(true)}>
            Show All {fullCities.length} Cities
          </button>
        </div>
      )}
    </section>
  );
}
