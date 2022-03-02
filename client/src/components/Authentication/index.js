import React from "react";
import Login from "../Login";
import Logout from "../Logout";

function Authentication(props) {
  
  const isLoggedIn = props.isLoggedIn;
  console.log("this "+isLoggedIn)
  if (!isLoggedIn) {
    return <Login/>;
  }
  else if(isLoggedIn){
    return <Logout/>;
  }
  else{
    return <h1>not working</h1>
  }
}

export default Authentication;
