import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./Navbar.css";
import logo from "../../../public/assets/Logo.svg";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Redirect handlers
  const handleLoginClick = () => {
    navigate("/login"); // Redirect to /login
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redirect to /register
  };

  return (
    <>
      <nav className="landing-navbar-navbar">
        <div className="landing-navbar-navbar-container">
          {/* Left Section: Logo & Brand */}
          <div className="landing-navbar-navbar-left">
            <span className="landing-navbar-brand">
              <img src={logo} alt="Logo" className="landing-navbar-brand-logo" />
              EmpRoster
            </span>
          </div>

          {/* Right Section (Desktop Menu) */}
          <div className="landing-navbar-navbar-right landing-navbar-desktop-menu">
            <a href="#subscription" className="landing-navbar-nav-link">Plans</a>
            <a href="#reviews" className="landing-navbar-nav-link">Reviews</a>
            <a href="#faq" className="landing-navbar-nav-link">FAQ</a>
            <button className="landing-navbar-nav-button" onClick={handleLoginClick}>Login</button>
            <button className="landing-navbar-nav-button" onClick={handleRegisterClick}>Register</button>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="landing-navbar-mobile-hamburger" onClick={toggleMobileMenu}>
            <span className="landing-navbar-hamburger-icon"></span>
            <span className="landing-navbar-hamburger-icon"></span>
            <span className="landing-navbar-hamburger-icon"></span>
          </div>
          
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="landing-navbar-mobile-menu">
          <a href="#subscription" className="landing-navbar-nav-link" onClick={closeMobileMenu}>Plans</a>
          <a href="#reviews" className="landing-navbar-nav-link" onClick={closeMobileMenu}>Reviews</a>
          <a href="#faq" className="landing-navbar-nav-link" onClick={closeMobileMenu}>FAQ</a>
          <button className="landing-navbar-nav-button" onClick={() => { closeMobileMenu(); handleLoginClick(); }}>Login</button>
          <button className="landing-navbar-nav-button" onClick={() => { closeMobileMenu(); handleRegisterClick(); }}>Register</button>
        </div>
      )}
    </>
  );
};

export default Navbar;
