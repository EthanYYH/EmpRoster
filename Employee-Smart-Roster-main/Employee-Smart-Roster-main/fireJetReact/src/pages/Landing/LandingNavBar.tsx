import React, { useState } from "react";
import "./landingNavBar.css";
import logo from "../../../public/assets/Logo.svg";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="landing-navbar">
        <div className="navbar-container">
          {/* Logo and App Name */}
          <div className="navbar-logo">
            <img src={logo} alt="Logo" />
            <h1>EmpRoster</h1>
            <span></span>
          </div>
          {/* Desktop Menu (hidden on mobile) */}
          <div className="navbar-actions desktop-menu">
            <button className="btn login-btn">Login</button>
            <button className="btn register-btn">Register</button>
          </div>
          {/* Mobile Hamburger (shown on mobile) */}
          <div className="mobile-hamburger" onClick={toggleMobileMenu}>
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        
      </nav>
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button className="btn mobile-login-btn">Login</button>
          <button className="btn mobile-register-btn">Register</button>
        </div>
      )}

    </>
  );
};

export default Navbar;
