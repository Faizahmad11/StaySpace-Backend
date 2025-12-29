import React from "react";


function Partone() {
  const features = [
    {
      icon: "fa-solid fa-house",
      title: "Ideal Rooms",
      desc: "No need to visit the place. Book what you see — authentic listings and verified spaces. We value your time and trust.",
    },
    {
      icon: "fa-solid fa-user-slash",
      title: "No Brokers",
      desc: "StaySpace is 100% broker-free. No hidden costs, no middlemen — just direct listings for easy and honest renting.",
    },
    {
      icon: "fa-solid fa-lock",
      title: "Secure Payments",
      desc: "All transactions are safe and encrypted. We promise you a transparent and secure booking experience.",
    },
    {
      icon: "fa-solid fa-coins",
      title: "Refer & Earn",
      desc: "Invite friends to StaySpace and earn rewards. The more you share, the more you earn — simple as that.",
    },
  ];

  return (
    <section className="features-section">
      <div className="container text-center">
        <h2 className="section-title">
          Why <span>StaySpace</span> Is The Best Property Renting Platform?
        </h2>
        <p className="section-subtitle">
          We care for your comfort and security. Stay smart, stay with StaySpace.
        </p>

        <div className="row justify-content-center mt-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="col-md-3 col-sm-6 feature-card d-flex flex-column align-items-center"
            >
              <div className="icon-wrapper">
                <i className={feature.icon}></i>
                <span className="feature-number">{index + 1}</span>
              </div>
              <h5 className="feature-title mt-3">{feature.title}</h5>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partone;
