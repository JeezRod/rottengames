import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components'
import Authentication from "../Authentication"
import HamburgerMenu from '../HamburgerMenu';
import { useUser, useUserUpdateContext } from "../../UserContext"

//Style fo NavLink
const StyledNav = styled(NavLink)`
  display: inline-block;
  padding: 0 50px;
  font-weight: 700;
  font-size: 20px;
  text-decoration: none;
  color:black;
  margin: 1em;
  dark:text-white;
`;

const Navbar = () => {

  const user = useUser();

  return (
    <header className="flex w-full justify-between fixed z-10 dark:bg-gray-900 bg-white border-b-2 h-20">
      <HamburgerMenu />
      <nav className="items-center">
        <ul>
          <StyledNav className="dark:text-white" to="/">Home</StyledNav>
          <StyledNav className="dark:text-white" to="/games">Search</StyledNav>
          <StyledNav className="dark:text-white" to="about">About </StyledNav>
        </ul>
      </nav>
      <Authentication />
    </header>);
};

export default Navbar;