import React from "react";
import imageii from "../assets/img1.png";
import { Link} from "react-router-dom"; // useNavigate add kiya professional logic ke liye


function Parteight() {
  return (
    <section className="parteight-container">
      <div className="parteight-wrapper">
        <div className="parteight-image">
          <img src={imageii} alt="StaySpace Pakistan Team" />
        </div>

        <div className="parteight-content">
          <h2>
            A Passionate Pakistani Team <br /> <span>At Your Service 🇵🇰</span>
          </h2>
          <p>
            Welcome to <strong>StaySpace Pakistan</strong> — where innovation
            meets comfort. From Karachi’s skyline to Hunza’s valleys, our team
            works around the clock to make your living experience exceptional.
          </p>

          <Link to="/ContactUs"
          style={{ textDecoration: 'none', display: 'inline-block' }}
           className="btn-professional"
          >Contact Us</Link>
        </div>
      </div>
    </section>
  );
}

export default Parteight;
