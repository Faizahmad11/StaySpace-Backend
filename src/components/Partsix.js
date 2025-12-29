import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

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

const ssxRooms = [
  { image: image1, title: "Twin-Ensuite", desc: "Two beds with private bathroom." },
  { image: image2, title: "One Bed Apartment", desc: "Private living and sleeping space." },
  { image: image3, title: "Two Bed Apartment", desc: "Two-bedroom modern apartment." },
  { image: image4, title: "Non-Ensuite", desc: "Private room with shared bathroom." },
  { image: image5, title: "Twin-Studio", desc: "Two beds with kitchen access." },
  { image: image6, title: "Ensuite", desc: "Private ensuite room." },
  { image: image7, title: "Studio", desc: "All-in-one studio living." },
  { image: image8, title: "Twin Studio", desc: "Shared studio for two." },
  { image: image9, title: "Threedio", desc: "Three-person shared studio." },
  { image: image10, title: "Twodio", desc: "Compact self-contained flat." },
  { image: image11, title: "Dorm Room", desc: "Student dormitory living." },
];

export default function Partsix() {
  return (
    <section className="ssx-section">
      <motion.h2
        className="ssx-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Explore <span>StaySpace</span> Rooms
      </motion.h2>

      {/* TOP SLIDER */}
      <motion.div
        className="container ssx-slider"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={30}
          loop
          speed={4200}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          breakpoints={{
            320: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {ssxRooms.slice(0, 6).map((room, i) => (
            <SwiperSlide key={i}>
              <div className="ssx-card">
                <div className="ssx-img">
                  <img src={room.image} alt={room.title} />
                </div>
                <div className="ssx-body">
                  <h5>{room.title}</h5>
                  <p>{room.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* BOTTOM SLIDER */}
      <motion.div
        className="container ssx-slider"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1 }}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={30}
          loop
          speed={4600}
          autoplay={{
            delay: 0,
            reverseDirection: true,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          breakpoints={{
            320: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {ssxRooms.slice(5).map((room, i) => (
            <SwiperSlide key={i}>
              <div className="ssx-card">
                <div className="ssx-img">
                  <img src={room.image} alt={room.title} />
                </div>
                <div className="ssx-body">
                  <h5>{room.title}</h5>
                  <p>{room.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <motion.div
        className="ssx-cta"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <button className="ssx-btn-primary">
          Discover More at StaySpace
        </button>
      </motion.div>
    </section>
  );
}
