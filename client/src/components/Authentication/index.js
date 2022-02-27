import React from "react";
import Login from "../Login";
import Logout from "../Logout";

function Authentication(props) {
  
  const isLoggedIn = props.isLoggedIn;
  console.log("this "+isLoggedIn)
  if (!isLoggedIn) {
    return <Login/>;
  }
  return <Logout/>;
}

export default Authentication;
