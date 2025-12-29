import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import bgc1 from "../assets/bgc1.jpg";
import "../css/AddListing.css";

const AddListing = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id || user?.uid;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const url = e.target.value;
    setImage(url);
    setPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { title, price, city, town, location, image, userId };

    try {
      const res = await fetch("http://localhost:5000/api/listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add listing");

      alert("Property added successfully!");
      history.push("/landlord");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="add-listing-container"
      style={{
        backgroundImage: `url(${bgc1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="overlay">
        <div className="form-wrapper">
          <h2 className="form-title">Add New Property</h2>
          <form className="add-listing-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <select value={city} onChange={(e) => setCity(e.target.value)} required>
              <option value="">Select City</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Islamabad">Islamabad</option>
            </select>

            {city && (
              <select value={town} onChange={(e) => setTown(e.target.value)} required>
                <option value="">Select Town</option>
                {city === "Lahore" && (
                  <>
                    <option value="Gulberg">Gulberg</option>
                    <option value="DHA">DHA</option>
                    <option value="Johar Town">Johar Town</option>
                  </>
                )}
                {city === "Karachi" && (
                  <>
                    <option value="Clifton">Clifton</option>
                    <option value="PECHS">PECHS</option>
                    <option value="DHA">DHA</option>
                  </>
                )}
                {city === "Islamabad" && (
                  <>
                    <option value="F-6">F-6</option>
                    <option value="G-10">G-10</option>
                    <option value="Blue Area">Blue Area</option>
                  </>
                )}
              </select>
            )}

            <input
              type="text"
              placeholder="Full Location (Street / Map link)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={handleImageChange}
              required
            />

            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}

            <button type="submit" className="add-btn">
              Add Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
