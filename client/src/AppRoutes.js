// src/AppRoutes.js
import React, { useContext, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import LoggedInNavBar from "./components/LoggedInNavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Courses from "./components/Courses";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import HomeAfterLogin from "./components/home";
import MyCourses from "./components/MyCourses";
import LearnCourse from "./components/learnCourse";

function AppRoutes() {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");

  const hideNavbarRoutes = [
    "/home", "/dashboard", "/my-enrollments", "/profile", "/settings", "/my-lists"
  ];
  const isNavbarHidden = hideNavbarRoutes.includes(location.pathname);

  
  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      
      {!user && !isNavbarHidden && <Navbar />}


      <Routes>
        
        <Route path="/" element={user ? <Navigate to="/home" /> : <Hero />} />

        
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses searchInput={searchInput} />} />
        <Route path="/course/:searchQuery" element={<Courses searchInput={searchInput} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        
        <Route path="/home" element={user ? <HomeAfterLogin /> : <Navigate to="/login" />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-lists" element={<MyCourses />} />
        <Route path="/learn/:id" element={<LearnCourse />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
