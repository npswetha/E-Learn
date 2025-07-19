import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ProfileDropdown.css";

function ProfileDropdown({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const { name, email } = userData;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  console.log("ProfileDropdown user prop:", user, "local data:", userData);

  return (
    <div className="profile-container">
      <div className="avatar" onClick={() => setIsOpen(!isOpen)}>
        {user ? user[0].toUpperCase() : "U"}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="username">{user || "Guest"}</div>
          <p>Email: {email || "Not available"}</p>
          <div>
            <p onClick={() => { navigate("/courses"); setIsOpen(false); }}>Courses</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;