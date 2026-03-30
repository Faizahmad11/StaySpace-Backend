import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"; // v5
import logo1 from "../assets/output-onlinepngtools.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load user from localStorage initially
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Listen to localStorage changes (signup/login from other pages)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    history.push("/"); // redirect to home
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
        <div
          className={`collapse navbar-collapse justify-content-end ${
            menuOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link" to={listPropertyLink}>
                {listPropertyText}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactus">
                Contact Us
              </Link>
            </li>

            {/* Account Dropdown */}
            <li
              className="nav-item dropdown hover-dropdown"
              onClick={() => setAccountOpen(!accountOpen)}
              style={{ position: "relative" }}
            >
              <button className="nav-link btn btn-link p-0">
                <i className="fa fa-user me-1"></i>{" "}
                {user ? user.name : "My Account"}
              </button>

              <ul
                className={`dropdown-menu fade-dropdown ${
                  accountOpen ? "show" : ""
                }`}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  display: accountOpen ? "block" : "none",
                }}
              >
                {user ? (
                  <>
                    <li className="dropdown-item-text">
                      <strong>{user.name}</strong>
                      <br />
                      <small>{user.email}</small>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        <i className="fa-solid fa-right-from-bracket me-2"></i>{" "}
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/signin">
                        <i className="fa-solid fa-right-to-bracket me-2"></i>{" "}
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/listpropertyfree">
                        <i className="fa-solid fa-user-plus me-2"></i> Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>

            <li className="nav-item ms-lg-3">
              <Link className="btn refer-btn" to="/referearn">
                <i className="fa-solid fa-gift me-1"></i> Refer & Earn
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}