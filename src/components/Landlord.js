import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ListingCard from "./ListingCard";
import bgc1 from "../assets/bgc1.jpg";
import "../css/Landlord.css";

const Landlord = () => {
  const history = useHistory();
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [listings, setListings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [view, setView] = useState("profile");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "landlord") {
      history.replace(user ? "/tenant" : "/signup");
    }
  }, [user, history]);

  const fetchData = async () => {
    const currentUserId = user?._id || user?.id;
    if (!currentUserId) return;
    
    try {
      setLoading(true);
      const [resL, resA] = await Promise.all([
        fetch(`http://localhost:5000/api/listing/user/${currentUserId}`),
        fetch(`http://localhost:5000/api/landlord/applications/${currentUserId}`)
      ]);
      
      const dataL = await resL.json();
      const dataA = await resA.json();
      
      setListings(Array.isArray(dataL) ? dataL : (dataL.listings || []));
      setApplications(Array.isArray(dataA) ? dataA : (dataA.applications || []));
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?._id]);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/application/status/${appId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplications(prev => 
          prev.map(app => app._id === appId ? { ...app, status: newStatus } : app)
        );
      }
    } catch (err) {
      alert("Update failed!");
    }
  };

  const handleDelete = async (listingId) => {
    if (window.confirm("Delete this property?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/listing/${listingId}`, { method: "DELETE" });
        if (res.ok) {
          setListings(prev => prev.filter((item) => (item._id || item.id) !== listingId));
        }
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  if (loading) return <div className="loader-container"><div className="spinner-grow text-primary"></div></div>;

  return (
    <div className="landlord-dashboard-v3">
      {/* Realistic Hero Banner */}
      <div className="dashboard-top-banner" style={{ backgroundImage: `url(${bgc1})` }}>
        <div className="overlay-dark"></div>
        <div className="banner-content">
          <h1 className="fw-bold m-0">Landlord Portal</h1>
          <p className="opacity-75 lead">Manage your properties and requests</p>
        </div>
      </div>

      <div className="container main-layout">
        <div className="row g-4">
          
          {/* Sidebar Section */}
          <div className="col-lg-3">
            <div className="sidebar-card shadow-lg border-0 p-3">
              <div className="text-center p-3">
                <div className="avatar-wrapper shadow-sm">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" />
                  ) : (
                    <span>{user?.name?.charAt(0)}</span>
                  )}
                </div>
                <h5 className="mt-3 fw-bold text-dark mb-0">{user?.name}</h5>
                <p className="text-muted small">{user?.email}</p>
              </div>
              
              <nav className="menu-links mt-2">
                <button className={`nav-link-custom ${view === "profile" ? "active" : ""}`} onClick={() => setView("profile")}>
                  <i className="fa-solid fa-house-user"></i> My Listings
                </button>
                <button className={`nav-link-custom ${view === "applications" ? "active" : ""}`} onClick={() => setView("applications")}>
                  <i className="fa-solid fa-envelope-open"></i> 
                  <span>Requests</span>
                  {applications.filter(a => a.status === "Pending").length > 0 && 
                    <span className="count-badge">{applications.filter(a => a.status === "Pending").length}</span>
                  }
                </button>
                <button onClick={() => history.push("/addlisting")} className="nav-link-custom btn-accent text-white mt-3">
                   <i className="fa-solid fa-circle-plus"></i> Add Property
                </button>
                <hr className="my-3 opacity-25" />
                <button className="nav-link-custom text-danger" onClick={() => { localStorage.clear(); history.push("/signin"); }}>
                   <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-lg-6">
            <div className="content-card shadow-lg border-0 p-4 min-vh-100">
              {view === "profile" ? (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                    <h5 className="fw-bold m-0 text-dark">Active Properties ({listings.length})</h5>
                  </div>
                  <div className="row g-4">
                    {listings.length > 0 ? listings.map((item) => (
                      <div className="col-md-6 col-xl-4" key={item._id || item.id}>
                        <ListingCard 
                          listing={item} 
                          onDelete={() => handleDelete(item._id || item.id)}
                          onEdit={() => history.push(`/editlisting/${item._id || item.id}`)}
                        />
                      </div>
                    )) : (
                      <div className="col-12 text-center py-5">
                         <div className="fs-1 mb-3">🏠</div>
                         <p className="text-muted">No listings available.</p>
                         <button className="btn btn-primary rounded-pill px-4" onClick={() => history.push("/addlisting")}>Create One</button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="requests-panel">
                  <h5 className="fw-bold mb-4 text-dark border-bottom pb-3">Tenant Inquiries</h5>
                  <div className="d-flex flex-column gap-3">
                    {applications.length > 0 ? applications.map((app) => (
                      <div className="request-card-pro shadow-sm" key={app._id}>
                        <div className="d-flex align-items-center gap-3">
                          <div className="tenant-icon">
                             {app.tenantId?.name?.charAt(0) || "T"}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold text-dark">{app.tenantId?.name || "Anonymous"}</h6>
                            <p className="text-muted mb-0 small">Asking for: <span className="text-primary fw-semibold">{app.listingId?.title}</span></p>
                          </div>
                        </div>
                        
                        <div className="d-flex align-items-center gap-3">
                           <span className={`status-tag ${app.status.toLowerCase()}`}>{app.status}</span>
                           {app.status === "Pending" && (
                             <div className="btn-group-pro">
                               <button className="btn-ok" onClick={() => handleStatusUpdate(app._id, "Accepted")}><i className="fa-solid fa-check"></i></button>
                               <button className="btn-no" onClick={() => handleStatusUpdate(app._id, "Rejected")}><i className="fa-solid fa-times"></i></button>
                             </div>
                           )}
                        </div>
                      </div>
                    )) : <div className="text-center py-5 text-muted">No requests found.</div>}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Landlord;