import React from 'react';
import './nav.css'
import Hamburger from 'hamburger-react'
import { Link } from "react-router-dom";



const Navbar = () => {
  return (
  <header>
    <Hamburger direction="right" />
    <nav>
        <ul>
            <Link to="/"> Home </Link>
            <li> Search </li>
            <Link to="about">About </Link>
        </ul>
    </nav>

    <button>Login/Register</button>
  </header>);
};

export default Navbar;
