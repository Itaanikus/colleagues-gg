import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

function Nav() {
  return (
    <header>
      <nav className="navbar app-navbar">
          <Link to="/" className="navbar-logo"><i className="fas fa-brain"></i> ColLeagues GG</Link>
      </nav>
    </header>
  );
}

export default Nav;