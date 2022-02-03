import React from 'react';
import './nav.css'
import Hamburger from 'hamburger-react'



const Navbar = () => {
  return (
  <header>
    <Hamburger direction="right" />
    <nav>
        <ul>
            <li> Home </li>
            <li> Search </li>
            <li> About </li>
        </ul>
    </nav>

    <button>Login/Register</button>
  </header>);
};

export default Navbar;
