import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Tenant = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Tenant";

  const [listings, setListings] = useState([]);

  // ROLE GUARD: Only tenant can access
  useEffect(() => {
    if (!user) {
      history.replace("/signup");
    } else if (user.role !== "tenant") {
      // redirect landlord to landlord page
      history.replace("/landlord");
    }
  }, [user, history]);

  // FETCH ALL AVAILABLE LISTINGS
  useEffect(() => {
    fetch("http://localhost:5000/api/listing") // assuming backend returns all listings
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.log(err));
  }, []);

  // APPLY FUNCTION (optional)
  const handleApply = (listingId) => {
    alert(`Applied for listing ${listingId}`);
    // later call backend API to apply
  };

  return (
    <div className="container py-5">
      <h2>Welcome, {name} 👋</h2>
      <p className="text-muted mb-4">Explore available listings</p>

      {listings.length === 0 ? (
        <p className="text-muted">No listings available at the moment.</p>
      ) : (
        <div className="row">
          {listings.map((item) => (
            <div className="col-md-4 mb-4" key={item._id}>
              <div className="card shadow-sm h-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5>{item.title}</h5>
                  <p className="text-muted">Rs {item.price}</p>
                  <button
                    className="btn btn-sm btn-primary w-100"
                    onClick={() => handleApply(item._id)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tenant;
