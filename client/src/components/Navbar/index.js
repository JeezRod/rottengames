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
  
  // An example on how to use the user api to get the user data
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


  async function checkLoggedIn() {
    const response = await fetch("api/user")
    if(response.status.ok){
      setLoggedIn(true)
      console.log("this "+ {loggedIn})
    }
    else{
      console.log("that "+ {loggedIn})
      setLoggedIn(false)
    }
  }
  const checkStatus = async () => {
    const response = await fetch("api/user");
      //setLoggedIn(true)
      //console.log("this "+ {loggedIn})
      //console.log("that "+ {loggedIn})
      //setLoggedIn(false)
    }

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
    <Authentication isLoggedIn={loggedIn}/>
    <p>other thing: {loggedIn}</p>
  </header>);
};

export default Navbar;
