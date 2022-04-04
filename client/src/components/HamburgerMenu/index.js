import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import "./HamburgerMenu.css";
import styled from 'styled-components'
import { useUser, useUserUpdateContext } from "../../UserContext"
import DarkMode from "../../hooks/DarkMode";

import counterpart from "counterpart";
import en from "../../languages/en";
import fr from "../../languages/fr";
import tr from "../../languages/tr";

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('fr', fr);
counterpart.registerTranslations('tr', tr);


//Style fo NavLink
const StyledNav = styled(NavLink)`
  display: inline-block;
  font-weight: 700;
  font-size: 18px;
  text-decoration: none;
  color:black;
`;


const HamburgerMenu = (props) => {

  const user = useUser();
  const [colorTheme, setTheme] = DarkMode();
  const [menuOpenState, setMenuOpenState] = React.useState(false);

  let langLocal = "en";
  if (localStorage.language){
    langLocal = localStorage.language
  }

  const [lang, setLang] = React.useState(langLocal);
  localStorage.setItem('language', lang);

  React.useEffect(() => {
    let languageInLocal = window.localStorage.getItem('language')

    if (languageInLocal) {
      counterpart.setLocale(languageInLocal);
      setLang(languageInLocal);
    }
  },[])

  function onLangChange(e) {
      setLang(e.target.value);
      counterpart.setLocale(e.target.value);
    }

  return (
    <Menu isOpen={menuOpenState} onOpen={() => setMenuOpenState(true)} onClose={() => setMenuOpenState(false)}>
      <div className='hidden'>
        <StyledNav onClick={() => setMenuOpenState(false)} to="/"> Home </StyledNav>
        <StyledNav onClick={() => setMenuOpenState(false)} to="/games"> Search </StyledNav>
        <StyledNav onClick={() => setMenuOpenState(false)} to="about">About </StyledNav>
      </div>
      <>
        {
          user.email
            ? <>
              {user.admin && <StyledNav onClick={() => setMenuOpenState(false)} to="dashboard">Dashboard </StyledNav>}
              <StyledNav onClick={() => setMenuOpenState(false)} to={"profile/" + user.id}>Profile</StyledNav>
            </>
            :
            null
        }
      </>
      <button onClick={() => setTheme(colorTheme)}>
        {colorTheme === 'light' ?
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg> :
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>}
      </button>

      <select value={lang} onChange={onLangChange} className="bg-black text-white p-2.5 font-bold hover:bg-gray-700 transition ease-in-out dark:bg-white dark:text-white dark:bg-orange-400 dark:hover:bg-orange-500 dark:hover:text-white">
        <option value="en">EN</option>
        <option value="fr">FR</option>
        <option value="tr">TR</option>
      </select>

    </Menu >
  )
}

export default HamburgerMenu;
