import React, { useState } from "react";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(""); // 🔴 To hold error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      navigate("/login"); // ✅ redirect to login if success
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("User already exists");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up for LearnTech</h2>

        {error && <p className="error-message">{error}</p>} {/* 🔴 Error displayed */}

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}

export default Signup;
