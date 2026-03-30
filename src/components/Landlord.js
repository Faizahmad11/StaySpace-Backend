import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ListingCard from "./ListingCard";
import bgc1 from "../assets/bgc1.jpg";

const Landlord = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchCity, setSearchCity] = useState("");

  // 🔒 AUTH CHECK
  useEffect(() => {
    if (!user) history.replace("/signup");
    else if (user.role !== "landlord") history.replace("/tenant");
  }, [user, history]);

  // 📦 FETCH USER LISTINGS
  useEffect(() => {
    if (!user?._id) return;

    fetch(`http://localhost:5000/api/listing/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        // Make sure we get an array
        const listingsArray = Array.isArray(data.listings) ? data.listings : [];
        setListings(listingsArray);
        setFilteredListings(listingsArray);
      })
      .catch((err) => {
        console.error("Failed to fetch listings:", err);
        setListings([]);
        setFilteredListings([]);
      });
  }, [user?._id]);

  // 🗑 DELETE LISTING
  const handleDelete = (id) => {
    if (!window.confirm("Delete this listing?")) return;

    fetch(`http://localhost:5000/api/listing/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        const updated = listings.filter((i) => i._id !== id);
        setListings(updated);
        setFilteredListings(updated);
      })
      .catch((err) => {
        console.error("Failed to delete listing:", err);
      });
  };

  // 🔍 SEARCH BY CITY
  const handleSearchCity = (e) => {
    const value = e.target.value;
    setSearchCity(value);

    if (!value) setFilteredListings(listings);
    else {
      setFilteredListings(
        listings.filter((i) =>
          i.city?.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      {/* 🔥 HERO IMAGE (NAVBAR BEHIND) */}
      <div
        className="navbar-hero"
        style={{ backgroundImage: `url(${bgc1})` }}
      >
        <div className="hero-overlay">
          <h2>Welcome, {user?.name}</h2>
        </div>
      </div>

      {/* ⬇️ DASHBOARD */}
      <div className="dashboard-wrapper">
        <aside className="dashboard-sidebar">
          <div className="profile-box">
            <div className="avatar">{user?.name?.charAt(0)}</div>
            <h4>{user?.name}</h4>
            <p>{user?.email}</p>
          </div>

          <ul className="menu">
            <li className="active">My Profile</li>
            <li>Property Status</li>
            <li>Booked Property</li>
            <li onClick={() => history.push("/addlisting")}>
              Submit New Property
            </li>
            <li
              onClick={() => {
                localStorage.removeItem("user");
                history.replace("/signin");
              }}
            >
              Logout
            </li>
          </ul>
        </aside>

        <main className="dashboard-content">
          <div className="dashboard-header">
            <h2>My Listings</h2>
            <button
              className="add-btn1"
              onClick={() => history.push("/addlisting")}
            >
              + Add New Listing
            </button>
          </div>

          <input
            className="search-input"
            placeholder="Search by city"
            value={searchCity}
            onChange={handleSearchCity}
          />

          {/* 🏘 LISTINGS */}
          {Array.isArray(filteredListings) && filteredListings.length > 0 ? (
            <div className="row">
              {filteredListings.map((item) => (
                <div className="col-md-4 mb-4" key={item._id}>
                  <ListingCard listing={item} handleDelete={handleDelete} />
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-text">No listings found</p>
          )}
        </main>
      </div>
    </>
  );
};

export default Landlord;