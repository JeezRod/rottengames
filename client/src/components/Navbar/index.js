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

  const [data, setData] = React.useState([]);
  const [username, setUserName] = React.useState("");
  
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
    console.log("email:"+ data.email)
    setUserName(data.email)
  }
  
  React.useEffect(() => {
    async function fetchMyAPI() {
      const res = await fetch("api/user")
      let data = await res.json()
      console.log("email:"+ data)
      setUserName(data)
    }
    fetchMyAPI()
  }, [])

  const handleLogout = async response => {
  
    const res = await fetch("/api/v1/auth/logout", {
     method: "DELETE",
 
  })
  const data = await res.json()
  setUserName("");
  }

  async function fetchData() {
    //Fetching the data
    let data = await fetch("/api/users");
    let dataJson = await data.json();
    //Set the returned data
    //console.log(dataJson);
    //await setTotalUsers(dataJson);
  }
  fetchData();

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
