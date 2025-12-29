import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";


import lahoreImg from "../assets/t1.jpg";
import karachiImg from "../assets/t2.jpg";
import islamabadImg from "../assets/t3.jpg";
import multanImg from "../assets/t4.jpg";
import peshawarImg from "../assets/t5.jpg";

const testimonials = [
  {
    name: "Ali Raza",
    city: "Lahore, Punjab University Student",
    img: lahoreImg,
    text: "StaySpace helped me find a clean and affordable hostel near Punjab University. The process was smooth, the staff was helpful, and I felt safe the entire time. Highly recommended for students in Lahore!",
  },
  {
    name: "Hassan Yousaf",
    city: "Karachi, NED University Student",
    img: karachiImg,
    text: "Being new to Karachi was tough, but StaySpace made it easy. I found a safe and comfortable place near my university within two days. The website is super easy to use!",
  },
  {
    name: "Ahmad Bilal",
    city: "Islamabad, Quaid-e-Azam University Student",
    img: islamabadImg,
    text: "StaySpace truly understands student needs. They guided me step-by-step and helped me rent a peaceful apartment in Islamabad. Great experience!",
  },
  {
    name: "Maria Saleem",
    city: "Multan, BZU Student",
    img: multanImg,
    text: "In Multan, finding a good flat was nearly impossible—until I used StaySpace! Their listings are genuine and the team was responsive throughout my stay.",
  },
  {
    name: "Zainab Khan",
    city: "Peshawar, UET Student",
    img: peshawarImg,
    text: "StaySpace gave me exactly what I needed—a calm, affordable room near my campus. The team actually cared about my comfort and safety. Thanks to them!",
  },
];

function Partseven() {
  return (
    <section className="testimonial-section">
      <div className="testimonial-header">
        <h2>
          We Don’t Just Claim. <span>Pakistan Trusts StaySpace.</span>
        </h2>
        <p>
          Hear it from students across Lahore, Karachi, Islamabad, Multan, and
          Peshawar.
        </p>
      </div>

      <div className="testimonial-slider">
        <Swiper
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay]}
          loop={true}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="testimonial-user">
                  <img src={t.img} alt={t.name} />
                  <div>
                    <h4>{t.name}</h4>
                    <p>{t.city}</p>
                  </div>
                </div>
                <p className="testimonial-text">{t.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Partseven;
