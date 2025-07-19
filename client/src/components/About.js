import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <>
    <section className="about-section">
      <div className="container">
        <h1 className="section-title">About Us</h1>
        <div className="about-row">
          {/* Image */}
          <div className="about-image-col">
            <img
              src="/images/learn.jpg"
              alt="Learning Illustration"
              className="about-image"
            />
            <p className="founder-quote">
              We started LearnTech with one goal: to make quality education accessible to everyone. <br />
              <span className="quote-author">— Ayesha, Founder</span>
            </p>
          </div>

          {/* Text Content */}
          <div className="about-text-col">
            <h2 className="about-subtitle">Why <span className="highlight">LearnTech</span>?</h2>
            <p className="about-description">
              At LearnTech, we believe learning should be accessible, fun, and transformative. Our mission is to empower students and professionals with real-world skills through interactive, expert-led courses.
            </p>
            <p className="about-description">
              We’re building a learning environment that encourages growth, fosters curiosity, and drives innovation. Whether you're a beginner or looking to upskill, LearnTech offers a path tailored for you.
            </p>

            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-icon">🎓</div>
                <div className="stat-text">10k+ Learners</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⏰</div>
                <div className="stat-text">100+ Hours</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🌍</div>
                <div className="stat-text">20+ Countries</div>
              </div>
            </div>

            
            
          </div>
        </div>
      </div>
    </section>
    <div className="animated-section"> 
      <div className="mission-vision">
              <h3>Our Mission</h3>
              <p>To democratize education and make skill-building accessible to all — regardless of background, location, or income.</p>

              <h3>Our Vision</h3>
              <p>To become the go-to platform for anyone seeking personal and professional transformation through tech-enabled learning.</p>
            </div>

            {/* Community */}
            <div className="community-highlight">
              <h3>Join Our Community</h3>
              <p>
                We’re more than a platform — we’re a growing global community. Connect with peers, attend live events, and be part of our Discord and LinkedIn groups to keep learning beyond the screen.
              </p>
            </div>
    </div>
    </>
  );
};

export default About;
