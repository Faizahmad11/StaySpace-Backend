import React from "react";
import { useHistory } from "react-router-dom";

const ListingCard = ({ listing, onDelete, onEdit }) => {
  return (
    <div className="listing-card card shadow-sm h-100 border-0 rounded-4 overflow-hidden">
      <div className="position-relative">
        <img
          src={listing.image || "https://via.placeholder.com/300x200?text=No+Image"}
          alt={listing.title}
          className="listing-img"
          style={{ height: "180px", width: "100%", objectFit: "cover" }}
        />
        <div className="category-badge position-absolute top-0 end-0 m-2 px-2 py-1 bg-white rounded-3 shadow-sm small fw-bold">
          {listing.category}
        </div>
      </div>

      <div className="card-body p-3">
        <h6 className="fw-bold text-truncate mb-1">{listing.title}</h6>
        <p className="text-primary fw-bold mb-1">Rs {listing.price?.toLocaleString()} / month</p>
        
        {/* Dynamic Stats: Ab yahan static 2 beds nahi show hoga */}
        <div className="d-flex gap-3 text-muted small mb-2">
           <span><i className="fa-solid fa-bed me-1"></i> {listing.beds}</span>
           <span><i className="fa-solid fa-bath me-1"></i> {listing.baths}</span>
           <span><i className="fa-solid fa-ruler-combined me-1"></i> {listing.area}</span>
        </div>

        <div className="d-flex align-items-center text-muted small mb-3">
          <i className="fa-solid fa-location-dot me-1"></i> {listing.city}, {listing.town}
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm flex-grow-1" onClick={onEdit}>Edit</button>
          <button className="btn btn-outline-danger btn-sm flex-grow-1" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;