import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Blogify</h3>
            <p>Share your thoughts with the world through our simple, elegant blogging platform.</p>
          </div>
          
          <div className="footer-section">
            <h3>Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: support@blogify.com</p>
            <p>Phone: +1 123 456 7890</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Blogify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;