import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  // Toggles the hamburger state drawer open/closed
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar-container">
      <Link to="/home" className="navbar-brand" onClick={() => setIsOpen(false)}>
        CareerCompass
      </Link>
      
      {/* Hamburger Icon */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <span style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
        <span style={{ opacity: isOpen ? '0' : '1' }}></span>
        <span style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
      </div>
      
      {/* Navigation Links Menu Drawer */}
      <div className={`navbar-links ${isOpen ? 'mobile-open' : ''}`}>
        <Link to="/home" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/instructions" className="nav-link" onClick={() => setIsOpen(false)}>Instructions</Link>
        <Link to="/assessment" className="nav-link" onClick={() => setIsOpen(false)}>Assessment</Link>
        <Link to="/result" className="nav-link" onClick={() => setIsOpen(false)}>Previous Results</Link>
        
        <button onClick={() => { handleLogout(); setIsOpen(false); }} className="logout-btn">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;