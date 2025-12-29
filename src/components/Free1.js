import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import background from "../assets/imgi_12_homebanner1.jpg";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import "../css/Free1.css";

export default function Free1() {
  const history = useHistory();

  /* =========================
     SAFE AUTH CHECK (NO REDIRECT)
     ========================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    try {
      JSON.parse(storedUser); // just validate
    } catch {
      localStorage.removeItem("user"); // corrupted data fix
    }
  }, []);

  /* ========================= */

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

  /* =========================
     SIGNUP HANDLER
     ========================= */
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
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, role: activeRole }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      // ✅ SAVE FULL USER OBJECT
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user?.name || formData.name,
          email: data.user?.email || formData.email,
          role: activeRole,
          _id: data.user?._id,
        })
      );

      setToast({ show: true, message: "Account created successfully!" });
      setTimeout(() => setToast({ show: false, message: "" }), 2500);

      history.replace(activeRole === "landlord" ? "/landlord" : "/tenant");
    } catch (err) {
      alert(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     GOOGLE LOGIN
     ========================= */
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          role: activeRole,
        })
      );

      history.replace(activeRole === "landlord" ? "/landlord" : "/tenant");
    } catch (err) {
      alert("Google login failed: " + err.message);
    }
  };

  return (
    <div
      className="Free1-bg"
      style={{ backgroundImage: `url(${background})` }}
    >
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
          {[
            "name",
            "email",
            "username",
            "password",
            "confirmPassword",
            "phone",
          ].map((field) => (
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
              required
            />
          ))}

          <button
            type="submit"
            className="btn-primary w-100"
            disabled={loading}
          >
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
          Already have an account?{" "}
          <span onClick={() => history.push("/signin")}>Sign In</span>
        </p>
      </div>

      {/* TOAST */}
      {toast.show && <div className="toast-popup">{toast.message}</div>}
    </div>
  );
}
