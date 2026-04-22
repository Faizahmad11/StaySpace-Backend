import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import background from "../assets/imgi_12_homebanner1.jpg";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import "../css/Free1.css";

export default function Free1() {
  const history = useHistory();
  const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // =========================
  // SAFE AUTH REDIRECT
  // =========================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      const user = JSON.parse(storedUser);
      if (!user?.role) return;

      // Check if we are already on the target page to prevent infinite loop
      const targetPath = user.role === "landlord" ? "/landlord" : "/tenant";
      if (history.location.pathname !== targetPath) {
        history.replace(targetPath);
      }
    } catch (err) {
      console.error("Auth redirect error:", err);
      localStorage.removeItem("user");
    }
  }, [history]); // history dependency is enough here

  // =========================
  // STATE
  // =========================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [activeRole, setActiveRole] = useState("landlord");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  // =========================
  // SIGNUP
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      setLoading(true);
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: activeRole,
          username: formData.username || undefined,
          phone: formData.phone || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("user", JSON.stringify({
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      }));

      showToast("Account created successfully!");
      setTimeout(() => {
        history.replace(data.user.role === "landlord" ? "/landlord" : "/tenant");
      }, 800);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Free1-bg" style={{ backgroundImage: `url(${background})` }}>
      <div className="signup-card animate-fade-in">
        <h2>Welcome to StaySpace</h2>
        <p>Create your profile and join the community</p>

        <ul className="role-tabs">
          {["landlord", "tenant"].map((role) => (
            <li key={role}>
              <button
                type="button"
                className={`role-btn ${activeRole === role ? "active" : ""}`}
                onClick={() => setActiveRole(role)}
                disabled={loading}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          {["name", "email", "username", "password", "confirmPassword", "phone"].map((field) => (
            <input
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field === "confirmPassword" ? "Confirm Password" : field === "phone" ? "Mobile Number" : field.charAt(0).toUpperCase() + field.slice(1)}
              type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
              className="signup-input"
              required={field !== "username" && field !== "phone"}
              disabled={loading}
            />
          ))}

          <button className="btn-primary w-100" type="submit" disabled={loading}>
            {loading ? "Processing..." : `Sign Up as ${activeRole}`}
          </button>
        </form>

        <p className="signin-link">
          Already have an account?{" "}
          <span onClick={() => history.push("/signin")} style={{cursor: 'pointer', color: 'var(--primary-color)', fontWeight: 'bold'}}>Sign In</span>
        </p>
      </div>

      {toast.show && <div className="toast-popup">{toast.message}</div>}
    </div>
  );
}