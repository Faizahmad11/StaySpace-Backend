import React, { useState, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import bgc1 from "../assets/bgc1.jpg";
import "../css/AddListing.css";

const AddListing = () => {
  const history = useHistory();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || user?.id;

  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    city: "",
    town: "",
    location: "",
    beds: "1",
    baths: "1",
    area: "",
    category: "Apartment",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 1000+ Cities List (Sample common ones, you can expand this array)
  const allCities = useMemo(() => [
    "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Gujranwala", "Peshawar", "Multan", 
    "Hyderabad", "Islamabad", "Quetta", "Bahawalpur", "Sargodha", "Sialkot", "Sukkur", 
    "Larkana", "Sheikhupura", "Rahim Yar Khan", "Jhang", "Dera Ghazi Khan", "Gujrat", 
    "Sahiwal", "Wah Cantonment", "Mardan", "Kasur", "Okara", "Mingora", "Nawabshah", 
    "Chiniot", "Kotri", "Kāmoke", "Hafizabad", "Sadiqabad", "Mirpur Khas", "Burewala", 
    "Kohat", "Khanewal", "Dera Ismail Khan", "Turbat", "Muzaffargarh", "Abbottabad",
    // Aap yahan mazeed cities add kar sakte hain...
  ].sort(), []);

  const [filteredCities, setFilteredCities] = useState([]);

  // Load Data for Edit Mode
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchListingData();
    }
  }, [id]);

  const fetchListingData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/listing/${id}`);
      const data = await res.json();
      if (res.ok) {
        setFormData({
          title: data.title,
          price: data.price,
          city: data.city,
          town: data.town,
          location: data.location,
          beds: data.beds.toString(),
          baths: data.baths.toString(),
          area: data.area,
          category: data.category,
        });
        setPreview(data.image);
        setExistingImageUrl(data.image);
      }
    } catch (err) {
      console.error("Error loading listing:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "city") {
      if (value.length > 0) {
        const filtered = allCities.filter(c => 
          c.toLowerCase().startsWith(value.toLowerCase())
        ).slice(0, 10); // Show top 10 matches for performance
        setFilteredCities(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("http://localhost:5000/api/upload/cloud", {
      method: "POST",
      body: data,
    });
    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please login again!");
    
    setLoading(true);
    try {
      let finalImageUrl = existingImageUrl;
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      if (!finalImageUrl) throw new Error("Image upload failed!");

      const payload = {
        ...formData,
        price: Number(formData.price),
        beds: Number(formData.beds),
        baths: Number(formData.baths),
        image: finalImageUrl,
        userId: userId // Ensure this is sent correctly
      };

      const url = isEditMode 
        ? `http://localhost:5000/api/listing/${id}` 
        : "http://localhost:5000/api/listing";
      
      const response = await fetch(url, {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(isEditMode ? "Updated Successfully! ✨" : "Property Published! 🏠");
        history.push("/landlord");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save listing");
      }
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-listing-page" style={{ backgroundImage: `url(${bgc1})` }}>
      <div className="glass-overlay"></div>
      <div className="form-card shadow-lg border-0 rounded-4 p-4">
        <div className="form-header text-center mb-4">
          <h2 className="fw-bold text-dark">{isEditMode ? "Edit Property 📝" : "List Your Property 🏠"}</h2>
          <p className="text-muted small">Enter accurate details to get better tenant inquiries</p>
        </div>

        <form onSubmit={handleSubmit} className="modern-form">
          <div className="row g-3">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label small fw-bold">Property Title</label>
                <input type="text" name="title" className="form-control rounded-3" value={formData.title} onChange={handleInputChange} placeholder="e.g. Luxury 2-Bed Apartment" required />
              </div>

              <div className="form-group mb-3">
                <label className="form-label small fw-bold">Monthly Rent (Rs)</label>
                <input type="number" name="price" className="form-control rounded-3" value={formData.price} onChange={handleInputChange} placeholder="35000" required />
              </div>

              <div className="row g-2">
                <div className="col-6 position-relative">
                  <label className="form-label small fw-bold">City</label>
                  <input type="text" name="city" className="form-control rounded-3" value={formData.city} onChange={handleInputChange} autoComplete="off" required />
                  {showSuggestions && filteredCities.length > 0 && (
                    <ul className="city-suggestions-list shadow-sm">
                      {filteredCities.map((c, i) => (
                        <li key={i} onClick={() => { setFormData({...formData, city: c}); setShowSuggestions(false); }}>{c}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold">Beds</label>
                  <select name="beds" className="form-select rounded-3" value={formData.beds} onChange={handleInputChange}>
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label className="form-label small fw-bold">Category</label>
                <select name="category" className="form-select rounded-3" value={formData.category} onChange={handleInputChange}>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Portion</option>
                  <option>Room</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label className="form-label small fw-bold">Area (e.g. 5 Marla / 1 Kanal)</label>
                <input type="text" name="area" className="form-control rounded-3" value={formData.area} onChange={handleInputChange} placeholder="5 Marla" required />
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label small fw-bold">Town / Sector</label>
                  <input type="text" name="town" className="form-control rounded-3" value={formData.town} onChange={handleInputChange} placeholder="DHA Phase 5" required />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold">Baths</label>
                  <select name="baths" className="form-select rounded-3" value={formData.baths} onChange={handleInputChange}>
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group mt-3 mb-3">
            <label className="form-label small fw-bold">Full Detailed Address</label>
            <input type="text" name="location" className="form-control rounded-3" value={formData.location} onChange={handleInputChange} placeholder="House #, Street #, Near..." required />
          </div>

          {/* Upload Box */}
          <div className="upload-wrapper border rounded-4 p-3 text-center bg-light">
            <label className="m-0 pointer w-100 h-100">
              <i className="fa-solid fa-cloud-arrow-up fs-3 text-primary d-block mb-2"></i>
              <span className="small text-muted">{imageFile ? "Image Selected" : "Click to Upload Property Photo"}</span>
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
            {preview && (
              <div className="mt-3">
                <img src={preview} alt="preview" className="rounded-3 shadow-sm" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 py-3 mt-4 rounded-3 fw-bold shadow" disabled={loading}>
            {loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Processing...</> : (isEditMode ? "Update Listing" : "Publish Listing Now")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;