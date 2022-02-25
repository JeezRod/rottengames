import React from 'react';
import './nav.css'
import Hamburger from 'hamburger-react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components'
import GoogleLogin, { GoogleLogout } from 'react-google-login';

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

  //The username of the user logged in
  const [username, setUserName] = React.useState("");
  
  //This method handles the google login button
  const handleLogin = async googleData => {
    const res = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    let data = await res.json()
    console.log(data)
    //set the userName to the email
    setUserName(data.email)
  }
  
  // An example on how to use the user api to get the user data
  React.useEffect(() => {
    async function fetchMyAPI() {
      const res = await fetch("api/user")
      console.log(res.status)
      let data = await res.json()
      console.log(data)
      setUserName(data.email)
    }
    fetchMyAPI()
  }, [])

  //This method handles the google logout button
  const handleLogout = async response => {
  
    const res = await fetch("/api/v1/auth/logout", {
     method: "DELETE",
 
  })
  const data = await res.json()
  setUserName("");
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
    <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={'single_host_origin'}
    />
    <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
      />

    <p>Hello {username === "" ? "Anonymous" : username}</p>
  </header>);
};

export default Navbar;
