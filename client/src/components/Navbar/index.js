import React from 'react';
import './nav.css'
import Hamburger from 'hamburger-react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components'

//Style fo NavLink
const StyledNav = styled(NavLink)`
  display: inline-block;
  padding-left: 100px;
  font-weight: 700;
  font-size: 18px;
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
            <StyledNav to="dashboard">Dashboard </StyledNav>
        </ul>
    </nav>

    <StyledNav to="/login">Login</StyledNav>
  </header>);
};

export default Navbar;
