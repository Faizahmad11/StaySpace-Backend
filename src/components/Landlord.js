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

  useEffect(() => {
    if (!user) history.replace("/signup");
    else if (user.role !== "landlord") history.replace("/tenant");
  }, [user, history]);

  useEffect(() => {
    if (!user?._id) return;
    fetch(`http://localhost:5000/api/listing/user/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setFilteredListings(data);
      });
  }, [user?._id]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this listing?")) return;
    fetch(`http://localhost:5000/api/listing/${id}`, { method: "DELETE" })
      .then(() => {
        const updated = listings.filter((i) => i._id !== id);
        setListings(updated);
        setFilteredListings(updated);
      });
  };

  const handleSearchCity = (e) => {
    const value = e.target.value;
    setSearchCity(value);
    if (!value) setFilteredListings(listings);
    else {
      setFilteredListings(
        listings.filter((i) =>
          i.city.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <>
      {/* 🔥 HERO IMAGE (NAVBAR KE PEECHE) */}
      <div
        className="navbar-hero"
        style={{ backgroundImage: `url(${bgc1})` }}
      >
        <div className="hero-overlay">
          <h2>Welcome, {user?.name}</h2>
        </div>
      </div>

      {/* ⬇️ DASHBOARD STARTS BELOW NAVBAR */}
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
    localStorage.removeItem("user"); // remove logged-in user
    history.replace("/signin");      // redirect to signin page
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

          {filteredListings.length === 0 ? (
            <p className="empty-text">No listings found</p>
          ) : (
            <div className="row">
              {filteredListings.map((item) => (
                <div className="col-md-4 mb-4" key={item._id}>
                  <ListingCard listing={item} handleDelete={handleDelete} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Landlord;
