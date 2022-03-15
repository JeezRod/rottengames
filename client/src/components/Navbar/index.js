import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components'
import Authentication from "../Authentication"
import HamburgerMenu from '../HamburgerMenu';
import { useUser, useUserUpdateContext } from "../../UserContext"

//Style fo NavLink
const StyledNav = styled(NavLink)`
  display: inline-block;
  padding-left: 100px;
  font-weight: 700;
  font-size: 24px;
  text-decoration: none;
  color:black;
  margin: 1em
`;

const Navbar = () => {

  const user = useUser();

  return (
    <header className="flex w-full justify-between">
      <HamburgerMenu />
      <nav className="items-center">
        <ul>
          <StyledNav to="/">Home</StyledNav>
          <StyledNav to="/games">Search</StyledNav>
          <StyledNav to="about">About </StyledNav>
        </ul>
      </nav>
      <Authentication />
    </header>);
};

export default Navbar;