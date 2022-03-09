import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import "./HamburgerMenu.css";
import styled from 'styled-components'
import {useUser, useUserUpdateContext} from "../../UserContext"



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

    const user = useUser();
    return(
        <Menu>
            <StyledNav to="/"> Home </StyledNav>
            <StyledNav to="/games"> Search </StyledNav>
            <StyledNav to="about">About </StyledNav>
            {user.email
            ?<>
              <StyledNav to="dashboard">Dashboard </StyledNav>
              <StyledNav to={"profile/"+user.id}>Profile</StyledNav>
            </>
            :
            null}
            
        </Menu>
    )
}

export default HamburgerMenu;
