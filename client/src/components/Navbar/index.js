import React, { useState } from 'react';
import './nav.css'
import Hamburger from 'hamburger-react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components'
import Authentication from "../Authentication"

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

  const [loggedIn, setLoggedIn] = useState();
  
  // checking if the user is logged in or not to determine if login or logout should be displayed.
  React.useEffect( () => {
    let mounted = true;
    fetch('/api/user').then(response => {
      if (response.status === 200) {
        console.log("1")
         return response.json().then(setLoggedIn(true));
      }
      else {
        console.log("2")
        return response.json().then(setLoggedIn(false));
      }
    } )
  //return () => mounted = false;
}, [] );

  return (
    <header>
      <Hamburger direction="right" />
      <nav>
        <ul>
            <StyledNav to="/"> Home </StyledNav>
            <StyledNav to="/games"> Search </StyledNav>
            <StyledNav to="about">About </StyledNav>
            <StyledNav to="dashboard">Dashboard </StyledNav>
            <StyledNav to="profile">Profile</StyledNav>
        </ul>
    </nav>
    <Authentication isLoggedIn={loggedIn}/>
  </header>);
};

export default Navbar;
