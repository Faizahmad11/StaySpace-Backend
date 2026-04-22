import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion, AnimatePresence } from "framer-motion";

// Images imports
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import image8 from "../assets/8.jpg";
import image9 from "../assets/9.jpg";
import image10 from "../assets/10.jpg";
import image11 from "../assets/11.jpg";

const rawImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];
const locations = [
  "Gulberg III, Lahore", "DHA Phase 6, Lahore", "Bahria Town, Lahore", 
  "Johar Town, Lahore", "F-7 Islamabad", "E-11 Islamabad", 
  "Model Town, Lahore", "Cavalry Ground, Lahore", "Wapda Town, Lahore",
  "Blue Area, Islamabad", "G-11 Islamabad", "Saddar, Rawalpindi"
];

// --- REALISTIC 50 SAMPLE ENTRIES GENERATOR ---
const sampleRooms = Array.from({ length: 50 }).map((_, i) => {
  let category = "Solo";
  let titlePrefix = "Premium Student Pod";
  let price = Math.floor(12000 + Math.random() * 8000); // 12k to 20k

  if (i % 3 === 1) {
    category = "Couple";
    titlePrefix = "Luxury Couple Studio";
    price = Math.floor(25000 + Math.random() * 15000); // 25k to 40k
  } else if (i % 3 === 2) {
    category = "Family";
    titlePrefix = "Family Executive Suite";
    price = Math.floor(45000 + Math.random() * 30000); // 45k to 75k
  }

  return {
    id: `sample-${i}`,
    image: rawImages[i % rawImages.length],
    title: `${titlePrefix} #${i + 101}`,
    location: locations[i % locations.length],
    category: category,
    specs: category === "Solo" ? "High-speed WiFi, Shared Kitchen, UPS Backup" : "Attached Bath, Furnished, 24/7 Security",
    owner: `+92 321 ${Math.floor(1000000 + Math.random() * 9000000)}`,
    price: price.toLocaleString(),
    isSample: true
  };
});

export default function Partsix() {
  const history = useHistory();
  const [realRooms, setRealRooms] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filter, setFilter] = useState("All");

  // Database se real listings fetch karna
  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/listing"); 
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const formattedData = data.map((item) => ({
          id: item._id,
          image: item.images?.[0] || rawImages[0],
          title: item.title,
          location: item.location || "Lahore",
          category: item.category || "Solo",
          specs: item.description || "No description provided.",
          owner: item.contactPhone || "+92 300 0000000",
          price: item.price ? item.price.toLocaleString() : "Contact for Price",
          isSample: false
        }));
        setRealRooms(formattedData);
      }
    } catch (err) {
      console.log("No real data found or API error.");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // --- MERGE REAL DATA + 50 SAMPLES ---
  const allRooms = useMemo(() => {
    return [...realRooms, ...sampleRooms];
  }, [realRooms]);

  const filteredRooms = useMemo(() => {
    if (filter === "All") return allRooms;
    return allRooms.filter(room => room.category.toLowerCase() === filter.toLowerCase());
  }, [filter, allRooms]);

  const categories = ["All", "Solo", "Couple", "Family"];

  return (
    <section className="ssx-section">
      <motion.h2 className="ssx-heading" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        Explore <span>StaySpace</span> Rooms
      </motion.h2>

      {/* FILTER TABS */}
      <div className="ssx-filter-bar">
        {categories.map((cat) => (
          <button 
            key={cat} 
            className={`ssx-filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat === "Solo" ? "Student/Solo" : cat === "Family" ? "Family Space" : cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!showAll ? (
          <motion.div key="slider-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Slider shows first 12 items (Mix of Real + Sample) */}
            <div className="container ssx-slider">
              <Swiper
                modules={[Autoplay]}
                slidesPerView={4}
                spaceBetween={25}
                loop={allRooms.length > 4}
                speed={4000}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
              >
                {allRooms.slice(0, 12).map((room, i) => (
                  <SwiperSlide key={room.id}>
                    <div className="ssx-card" onClick={() => setSelectedRoom(room)}>
                      <div className="ssx-img">
                        <img src={room.image} alt={room.title} />
                        {room.isSample ? <span className="ssx-tag-sample">Sample</span> : <span className="ssx-tag-live">NEW</span>}
                        <span className="ssx-tag">{room.category}</span>
                      </div>
                      <div className="ssx-body">
                        <h5>{room.title}</h5>
                        <p><i className="fa-solid fa-location-dot me-1"></i> {room.location}</p>
                        <p className="fw-bold text-primary">Rs. {room.price}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        ) : (
          <motion.div key="grid-view" className="container ssx-grid-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="ssx-grid">
              {filteredRooms.map((room) => (
                <motion.div 
                  key={room.id} className="ssx-card" 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className="ssx-img">
                    <img src={room.image} alt={room.title} />
                    <span className="ssx-tag">{room.category}</span>
                  </div>
                  <div className="ssx-body">
                    <h5>{room.title}</h5>
                    <p>{room.location}</p>
                    <p className="fw-bold text-primary">Rs. {room.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP DETAIL MODAL */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div className="ssx-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRoom(null)}>
            <motion.div className="ssx-modal-box" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={(e) => e.stopPropagation()}>
              <button className="ssx-close" onClick={() => setSelectedRoom(null)}>&times;</button>
              <div className="ssx-modal-content">
                <div className="ssx-modal-left"><img src={selectedRoom.image} alt="" /></div>
                <div className="ssx-modal-right">
                  <span className="modal-category">{selectedRoom.category} Luxury</span>
                  <h3>{selectedRoom.title}</h3>
                  <p className="fs-5 text-primary fw-bold">Price: Rs. {selectedRoom.price}</p>
                  <p><strong>📍 Location:</strong> {selectedRoom.location}</p>
                  <p><strong>✨ Features:</strong> {selectedRoom.specs}</p>
                  <p><strong>📞 Contact:</strong> {selectedRoom.owner}</p>
                  <div className="modal-actions">
                     <a href={`tel:${selectedRoom.owner}`} className="ssx-btn-call">
                        Call Now <i className="fa-solid fa-phone"></i> 
                     </a>
                     <button className="ssx-btn-urdu" onClick={() => {
                       if(selectedRoom.isSample) alert("This is a sample listing.");
                       else history.push(`/listing/${selectedRoom.id}`);
                     }}>
                        Full Details
                     </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ssx-cta">
        <button className="ssx-btn-primary" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Featured" : `Explore All 50+ Rooms`}
        </button>
      </div>
    </section>
  );
}