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

  const [loggedIn, setLoggedIn] = useState(false);
  
  // An example on how to use the user api to get the user data
  React.useEffect(() => {
    checkStatus();
  }, []);

  async function checkLoggedIn() {
    const response = await fetch("api/user", {cookiePolicy:'single_host_origin'})
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
  </header>);
};

export default Navbar;
