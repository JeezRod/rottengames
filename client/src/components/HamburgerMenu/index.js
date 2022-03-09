import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import "./HamburgerMenu.css";
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


const HamburgerMenu = (props) =>{
    return(
        <Menu>
            <StyledNav to="/"> Home </StyledNav>
            <StyledNav to="/games"> Search </StyledNav>
            <StyledNav to="about">About </StyledNav>
            {props.isLoggedIn
            ?<>
            <StyledNav to="dashboard">Dashboard </StyledNav>
            <StyledNav to={props.userId}>Profile</StyledNav>
            </>
            :
            null}
            
        </Menu>
    )
}

export default HamburgerMenu;
