import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"; // v5
import logo1 from "../assets/output-onlinepngtools.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();

  // 1. Scroll effect (Stable)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Load user initially with Safe Check
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        const parsedUser = JSON.parse(data);
        setUser(parsedUser);
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // 3. Listen to localStorage (Fix for Infinite Loop)
  useEffect(() => {
    const handleStorageChange = () => {
      const data = localStorage.getItem("user");
      const updatedUser = data ? JSON.parse(data) : null;
      
      // Sirf tab update karein agar user ID ya data change hua ho
      setUser((prevUser) => {
        if (JSON.stringify(prevUser) !== JSON.stringify(updatedUser)) {
          return updatedUser;
        }
        return prevUser;
      });
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event handle karne ke liye (agar same window mein login ho raha ho)
    window.addEventListener("userLoginStatusChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLoginStatusChange", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Token bhi remove karein safety ke liye
    setUser(null);
    setAccountOpen(false);
    history.push("/"); 
    // Trigger custom event taake header update ho jaye
    window.dispatchEvent(new Event("userLoginStatusChange"));
  };

  // =========================
  // DYNAMIC NAVBAR LINK
  // =========================
  let listPropertyLink = "/listpropertyfree";
  let listPropertyText = "List Property Free";

  if (user) {
    if (user.role === "landlord") {
      listPropertyLink = "/landlord";
      listPropertyText = "Landlord Dashboard";
    } else if (user.role === "tenant") {
      listPropertyLink = "/tenant";
      listPropertyText = "Tenant Dashboard";
    }
  }

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark custom-navbar fixed-top shadow-sm ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logo1} alt="StaySpace Logo" className="navbar-logo" />
          <span className="brand-name">StaySpace</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse justify-content-end ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link" to={listPropertyLink} onClick={() => setMenuOpen(false)}>
                {listPropertyText}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactus" onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
            </li>

            {/* Account Dropdown */}
            <li
              className="nav-item dropdown"
              style={{ position: "relative" }}
            >
              <button 
                className="nav-link btn btn-link p-0 d-flex align-items-center gap-1"
                onClick={() => setAccountOpen(!accountOpen)}
                style={{ textDecoration: 'none' }}
              >
                <i className="fa fa-user"></i>
                <span>{user ? user.name?.split(" ")[0] : "My Account"}</span>
              </button>

              <ul
                className={`dropdown-menu dropdown-menu-end shadow ${accountOpen ? "show" : ""}`}
                style={{
                  position: "absolute",
                  display: accountOpen ? "block" : "none",
                  right: 0,
                  top: "100%"
                }}
              >
                {user ? (
                  <>
                    <li className="dropdown-item-text border-bottom pb-2 mb-2">
                      <div className="fw-bold">{user.name}</div>
                      <small className="text-muted">{user.email}</small>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket me-2"></i> Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/signin" onClick={() => setAccountOpen(false)}>
                        <i className="fa-solid fa-right-to-bracket me-2"></i> Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/listpropertyfree" onClick={() => setAccountOpen(false)}>
                        <i className="fa-solid fa-user-plus me-2"></i> Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>

            <li className="nav-item ms-lg-2">
              <Link className="btn refer-btn" to="/referearn">
                <i className="fa-solid fa-gift me-1"></i> Refer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}