import React from "react";
import  { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Hero.css";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
function Hero() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home"); 
    }
  }, [user, navigate]);
  return (
  <>  
    <div className="hero">
      <div className="hero-text">
        <h1>Master New Skills with <br />Expert-Guided Learning</h1>
        <p>
          Learn at your own pace from top instructors. Gain real-world skills
          that help you grow, excel, and lead anywhere, anytime.
        </p>
        <div className="hero-buttons">
          <button className="get-started" onClick={() => navigate("/signup")}>Get Started</button>
          <button className="browse-courses" onClick={() => navigate("/courses")} >Browse All Courses</button>
        </div>
      </div>
      <div className="hero-image">
        <img src="/images/learning-illustration.png" alt="Learning Illustration" />
        <div className="learner-badge">
          <span>10,000+ </span> Satisfied Learners
        </div>
      </div>
    </div>
    <section className="testimonials">
        <h2>What Our Learners Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>“This platform helped me land a job in just 2 months! The courses are super practical.”</p>
            <div className="stars">★★★★★</div>
            <h4>— Priya Sharma</h4>
          </div>
          <div className="testimonial">
            <p>“Instructors are very knowledgeable, and the dashboard tracks my progress beautifully.”</p>
            <div className="stars">★★★★☆</div>
            <h4>— Arjun Patel</h4>
          </div>
          <div className="testimonial">
            <p>“Loved the design and ease of access. Highly recommend to every student!”</p>
            <div className="stars">★★★★★</div>
            <h4>— Meena R.</h4>
          </div>
        </div>
      </section>
      <Footer />
        
    </>
    
     
  );
}

export default Hero;
