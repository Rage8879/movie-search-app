import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

/**
 * Header Component
 * Provides navigation and branding for the application
 */
const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        {/* App Logo/Brand */}
        <Link to="/" className="logo">
          <h1>🎬 MovieFinder</h1>
        </Link>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Search Movies
          </Link>
          <Link 
            to="/favorites" 
            className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
          >
            My Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
