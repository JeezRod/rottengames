import React from 'react';
import './nav.css'
import Hamburger from 'hamburger-react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components'

//Style fo NavLink
const StyledNav = styled(NavLink)`
  display: inline-block;
  padding: 0px 30px;
  font-weight: 700;
  font-size: 24px;
  text-decoration: none;
  color:black;
`;

const Navbar = () => {
  return (
  <header>
    <Hamburger direction="right" />
    <nav>
        <ul>
            <StyledNav to="/"> Home </StyledNav>
            <StyledNav to="/games"> Search </StyledNav>
            <StyledNav to="about">About </StyledNav>
        </ul>
    </nav>

    <button>Login/Register</button>
  </header>);
};

export default Navbar;
