import React from "react";

function Partone() {
  const features = [
    {
      icon: "fa-solid fa-house",
      title: "Ideal Rooms",
      desc: "No need to visit the place. Book what you see — authentic listings and verified spaces.",
    },
    {
      icon: "fa-solid fa-user-slash",
      title: "No Brokers",
      desc: "StaySpace is 100% broker-free. No hidden costs, no middlemen — just direct listings.",
    },
    {
      icon: "fa-solid fa-lock",
      title: "Secure Payments",
      desc: "All transactions are safe and encrypted. We promise a transparent experience.",
    },
    {
      icon: "fa-solid fa-coins",
      title: "Refer & Earn",
      desc: "Invite friends to StaySpace and earn rewards. The more you share, the more you earn.",
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">
          Why <span>StaySpace</span> Is The Best?
        </h2>
        <p className="section-subtitle">
          We care for your comfort and security. Stay smart, stay with StaySpace.
        </p>

        {/* Custom Row for better control */}
        <div className="features-row">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="icon-wrapper">
                <i className={feature.icon}></i>
                <span className="feature-number">{index + 1}</span>
              </div>
              <h5 className="feature-title">{feature.title}</h5>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partone;