import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About E-Shop</h3>
          <p>Your one-stop shop for all your needs. Quality products at competitive prices.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><Link to="/contact">Help & Support</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📧 Email: info@eshop.com</p>
          <p>📞 Phone: +1 (555) 123-4567</p>
          <p>📍 Address: 123 Main St, City, Country</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
