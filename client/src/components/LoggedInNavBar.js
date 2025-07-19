import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";
import Logo from "./logo";
import "../styles/home.css"; // make sure this contains navbar styles

const LoggedInNavBar = ({ searchInput, setSearchInput }) => {
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleNavigation = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const closeDropdown = () => setShowDropdown(false);

  return (
    <nav className="dashboard-navbar" onClick={(e) => e.stopPropagation()}>
      <div className="logo" onClick={() => navigate("/home")}>
        <Logo />
        LearnTech
      </div>

      <SearchBar
        input={searchInput}
        setInput={setSearchInput}
        onSearch={(input) => setSearchInput(input)}
      />

      <button className="profile-icon-button" onClick={toggleDropdown}>
        <div className="circle-avatar">
          <i className="fas fa-user"></i>
        </div>
      </button>

      {showDropdown && (
        <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-header">
            <div className="circle-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="dropdown-username">{user?.name || "Learner"}</div>
          </div>

          <div className="dropdown-grid">
            <div className="grid-item" onClick={() => handleNavigation("/my-lists")}>
              <i className="fas fa-tasks"></i>
              <div className="grid-label">My Courses</div>
            </div>
            <div className="grid-item" onClick={() => handleNavigation("/progress")}>
              <i className="fas fa-chart-line"></i>
              <div className="grid-label">Progress</div>
            </div>
          </div>

          <span onClick={() => handleNavigation("/settings")}>
            <i className="fas fa-cog"></i> Settings
          </span>
          <span onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </span>
        </div>
      )}
    </nav>
  );
};

export default LoggedInNavBar;
