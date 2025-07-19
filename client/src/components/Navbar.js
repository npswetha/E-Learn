import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";
import Logo from "./logo";

function Navbar() {
  const { user} = useContext(AuthContext);
  const navigate = useNavigate();
  if (user) return null;

  return (
    <nav className="navbar">
      <div className="logo">
        <Logo />
        <Link to="/">LearnTech</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Explore</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>

        
        <li><Link to="/login">Login</Link></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
