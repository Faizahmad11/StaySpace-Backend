import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Bed, Bath, CheckCircle, ChevronRight } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import bgc1 from "../assets/bgc1.jpg"; 


const Tenant11 = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const [listings, setListings] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const [showApps, setShowApps] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applyingId, setApplyingId] = useState(null);

  useEffect(() => {
    if (!user) history.replace("/signup");
    else if (user.role !== "tenant") history.replace("/landlord");
  }, [user, history]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resList, resApps] = await Promise.all([
        fetch("http://localhost:5000/api/listing"),
        fetch(`http://localhost:5000/api/applications/my-applications/${user?._id}`)
      ]);
      const dataL = await resList.json();
      const dataA = await resApps.json();
      setListings(Array.isArray(dataL) ? dataL : dataL.listings || []);
      setMyApps(Array.isArray(dataA) ? dataA : []);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (listing) => {
    // 🟢 CRITICAL FIX: Aapka database 'userId' use kar raha hai landlord ke liye
    const landlordId = listing.userId; 

    if (!landlordId) {
      toast.error("Owner info missing in this listing!");
      console.log("Listing checking:", listing); // Debugging ke liye
      return;
    }

    setApplyingId(listing._id);
    try {
      const response = await fetch("http://localhost:5000/api/applications/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing._id,
          tenantId: user._id,
          landlordId: landlordId 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Application sent successfully! 🚀");
        setMyApps([...myApps, { 
          listingId: { _id: listing._id, title: listing.title, price: listing.price }, 
          status: 'Pending', 
          appliedAt: new Date() 
        }]);
      } else {
        toast.error(data.message || "Failed to apply");
      }
    } catch (err) {
      toast.error("Network error. Try again.");
    } finally {
      setApplyingId(null);
    }
  };

  const hasApplied = (listingId) => myApps.some(app => app.listingId?._id === listingId);

  return (
    <div className="tenant-dashboard-premium">
      <Toaster position="top-right" />
      
      <section className="hero-section" style={{ backgroundImage: `url(${bgc1})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.header 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className="dashboard-header-premium"
          >
            <div className="header-text">
              <span className="welcome-badge">Premium Access</span>
              <h2>Welcome, {user?.name?.split(" ")[0]}! 👋</h2>
              <p>Explore elite properties curated just for you.</p>
            </div>
            <div className="tab-switcher">
              <button className={!showApps ? "active" : ""} onClick={() => setShowApps(false)}>
                Explore Homes
              </button>
              <button className={showApps ? "active" : ""} onClick={() => setShowApps(true)}>
                My Requests
              </button>
            </div>
          </motion.header>
        </div>
      </section>

      <div className="content-container">
        <AnimatePresence mode="wait">
          {showApps ? (
            <motion.div key="apps" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Property Details</th>
                    <th>Investment</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {myApps.length > 0 ? myApps.map((app) => (
                    <tr key={app._id || Math.random()}>
                      <td><strong>{app.listingId?.title}</strong></td>
                      <td>Rs {app.listingId?.price?.toLocaleString()}</td>
                      <td><span className={`status-badge ${app.status?.toLowerCase()}`}>{app.status}</span></td>
                      <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" className="empty-state">No requests yet.</td></tr>
                  )}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div key="listings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="property-grid-premium">
              {listings.map((item) => (
                <motion.div className="premium-card" key={item._id} whileHover={{ y: -12 }} layout>
                  <div className="card-media">
                    <img src={item.image} alt={item.title} />
                    <div className="premium-price">Rs {item.price?.toLocaleString()}</div>
                    {hasApplied(item._id) && (
                      <div className="applied-overlay"><CheckCircle size={14}/> Applied</div>
                    )}
                  </div>
                  <div className="card-content">
                    <h5 className="title">{item.title}</h5>
                    <div className="location"><MapPin size={14} /> {item.location}</div>
                    <div className="features">
                      <span><Bed size={15}/> 2 Bed</span>
                      <span><Bath size={15}/> 2 Bath</span>
                    </div>
                    <button
                      className={`apply-action-btn ${hasApplied(item._id) ? 'applied' : ''}`}
                      disabled={hasApplied(item._id) || applyingId === item._id}
                      onClick={() => handleApply(item)}
                    >
                      {applyingId === item._id ? <span className="spinner"></span> : 
                       hasApplied(item._id) ? "Successfully Applied" : (
                         <>Apply Now <ChevronRight size={16} /></>
                       )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tenant11;