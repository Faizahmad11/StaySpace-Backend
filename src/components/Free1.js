import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import background from "../assets/imgi_12_homebanner1.jpg";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import "../css/Free1.css";

export default function Free1() {
  const history = useHistory();

  // =========================
  // SAFE AUTH CHECK (NO REDIRECT)
  // =========================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    try {
      const parsedUser = JSON.parse(storedUser);

      // Redirect immediately if user already signed up
      if (parsedUser.role === "landlord") history.replace("/landlord");
      else if (parsedUser.role === "tenant") history.replace("/tenant");
    } catch {
      localStorage.removeItem("user"); // corrupted data fix
    }
  }, [history]);

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
  const [toast, setToast] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =========================
  // SIGNUP HANDLER
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/auth/signup`,
        {
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
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      // ✅ Save full user with role
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          _id: data.user._id,
        })
      );

      setToast({ show: true, message: "Account created successfully!" });
      setTimeout(() => setToast({ show: false, message: "" }), 2500);

      // ✅ Redirect based on role immediately
      history.replace(data.user.role === "landlord" ? "/landlord" : "/tenant");
    } catch (err) {
      alert(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user?.email || !user?.displayName) {
        throw new Error("Google authentication failed");
      }

      // Send Google login info to backend
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/auth/social-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            provider: "google",
            role: activeRole,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Google login failed");

      // ✅ Save user + role
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          _id: data.user._id,
        })
      );

      // ✅ Redirect immediately
      history.replace(data.user.role === "landlord" ? "/landlord" : "/tenant");
    } catch (err) {
      alert(err.message || "Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="Free1-bg" style={{ backgroundImage: `url(${background})` }}>
      <div className="signup-card animate-fade-in">
        <h2>Welcome to StaySpace</h2>
        <p>Create your profile and join the community</p>

        {/* ROLE TABS */}
        <ul className="role-tabs">
          {["landlord", "tenant"].map((role) => (
            <li key={role}>
              <button
                type="button"
                className={`role-btn ${activeRole === role ? "active" : ""}`}
                onClick={() => setActiveRole(role)}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* SIGNUP FORM */}
        <form onSubmit={handleSubmit}>
          {["name", "email", "username", "password", "confirmPassword", "phone"].map(
            (field) => (
              <input
                key={field}
                type={
                  field.includes("password")
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                className="signup-input"
                placeholder={
                  field === "confirmPassword"
                    ? "Confirm Password"
                    : field === "phone"
                    ? "Mobile Number"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={field !== "username" && field !== "phone"}
              />
            )
          )}

          <button type="submit" className="btn-primary w-100" disabled={loading}>
            {loading ? "Signing Up..." : `Sign Up as ${activeRole}`}
          </button>
        </form>

        {/* GOOGLE LOGIN */}
        <button className="btn-google w-100" onClick={handleGoogleLogin}>
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            width="22"
            alt="Google"
          />
          Continue with Google
        </button>

        {/* SIGN IN LINK */}
        <p className="signin-link">
          Already have an account? <span onClick={() => history.push("/signin")}>Sign In</span>
        </p>
      </div>

      {/* TOAST */}
      {toast.show && <div className="toast-popup">{toast.message}</div>}
    </div>
  );
}