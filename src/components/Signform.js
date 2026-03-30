import React, { useState, useEffect } from "react";
import bgi from "../assets/imgi_12_homebanner1.jpg";
import { FaUser, FaLock, FaGoogle } from "react-icons/fa";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useHistory } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Signform = () => {
  const history = useHistory();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("tenant"); // Default role
  const [loading, setLoading] = useState(false);

  // Auto-login if already logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.role) redirectByRole(storedUser.role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectByRole = (role) => {
    if (role === "landlord") history.push("/landlord");
    else history.push("/tenant");
  };

  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  // ===== Normal login =====
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      alert("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (!res.data?.user) throw new Error("Invalid response from server");

      localStorage.setItem("user", JSON.stringify(res.data.user));
      redirectByRole(res.data.user.role);
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ===== Google login =====
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user?.email || !user?.displayName) {
        throw new Error("Google authentication failed");
      }

      // Send to backend
      const res = await axios.post(
        `${API_URL}/api/auth/social-login`,
        {
          name: user.displayName,
          email: user.email,
          provider: "google",
          role, // tenant or landlord
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      redirectByRole(res.data.user.role);
    } catch (err) {
      console.error("Google login error:", err);
      alert(err.response?.data?.message || err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${bgi})` }}>
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Log in to continue</p>

        {/* Role Selector */}
        <div className="role-selector">
          <button
            className={role === "tenant" ? "active" : ""}
            onClick={() => setRole("tenant")}
            type="button"
          >
            Tenant
          </button>
          <button
            className={role === "landlord" ? "active" : ""}
            onClick={() => setRole("landlord")}
            type="button"
          >
            Landlord
          </button>
        </div>

        {/* Normal login form */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google login */}
       <button
  type="button"
  className="google-btn"
  onClick={handleGoogleLogin}
  disabled={loading}
>
          <FaGoogle /> Continue with Google
        </button>

        <p className="forgot">Forgot Password?</p>

        <p className="bottom-text">
          Don’t have an account?{" "}
          <span onClick={() => history.push("/listpropertyfree")}>
            Sign Up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signform;