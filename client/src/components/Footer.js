import React, { useContext } from 'react';
import "../styles/footer.css";
import Logo from "./logo";
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
  const { user } = useContext(AuthContext); // 🔍 Get user from context

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <Logo />
          <h2> LearnTech</h2>
        </div>

        
        

        <div className="footer-newsletter">
          <h2>Subscribe to our newsletter</h2>
          <p>The latest news, articles, and resources, sent to your inbox weekly</p>
        </div>
      </div>

      <p className="footer-bottom">© 2025 LearnTech. All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
