import React from "react";
import { useHistory } from "react-router-dom";

const ListingCard = ({ listing, handleDelete }) => {
  const history = useHistory();

  return (
    <div className="listing-card card shadow-sm h-100">
      <img
        src={listing.image || "/assets/placeholder.jpg"}
        alt={listing.title}
        className="listing-img card-img-top"
      />
      <div className="listing-body card-body">
        <h5>{listing.title}</h5>
        <p className="price">Rs {listing.price}</p>
        <p className="text-muted">City: {listing.city}</p>
        <div className="action-btns d-flex justify-content-between">
          <button className="btn-edit" onClick={() => history.push(`/edit-listing/${listing._id}`)}>Edit</button>
          <button className="btn-delete" onClick={() => handleDelete(listing._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
