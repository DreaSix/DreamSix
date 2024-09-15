// src/components/NavbarBeforeLogin.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';
import logo from '../assets/IMG-20240915-WA0005.jpg'; // Update the path as needed

const NavbarBeforeLogin = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo"  height={50} width={100}/>
        </Link>
      </div>
      <ul >
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
};

export default NavbarBeforeLogin;
