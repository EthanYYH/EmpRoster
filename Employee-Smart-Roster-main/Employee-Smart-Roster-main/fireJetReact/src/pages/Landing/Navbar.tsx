import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../../public/assets/Logo.svg";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Left Section: Logo & Brand */}
          <div className="navbar-left">
            <span className="brand">
              <img src={logo} alt="Logo" className="brand-logo" />
              EmpRoster
            </span>
          </div>

          {/* Right Section (Desktop Menu) */}
          <div className="navbar-right desktop-menu">
            <a href="#subscription" className="nav-link">Plans</a>
            <a href="#reviews" className="nav-link">Reviews</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <button className="nav-button">Login</button>
            <button className="nav-button">Register</button> {/* Add Register Button */}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="mobile-hamburger" onClick={toggleMobileMenu}>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
            <span className="hamburger-icon"></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#subscription" className="nav-link" onClick={closeMobileMenu}>Plans</a>
          <a href="#reviews" className="nav-link" onClick={closeMobileMenu}>Reviews</a>
          <a href="#faq" className="nav-link" onClick={closeMobileMenu}>FAQ</a>
          <button className="nav-button" onClick={closeMobileMenu}>Login</button>
          <button className="nav-button" onClick={closeMobileMenu}>Register</button> {/* Add Register Button to Mobile Menu */}
        </div>
      )}
    </>
  );
};

export default Navbar;
