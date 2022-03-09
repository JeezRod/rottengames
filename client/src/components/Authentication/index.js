import React from "react";
import Login from "../Login";
import Logout from "../Logout";
import {useUser, useUserUpdateContext} from "../../UserContext"

function Authentication(props) {
  
  const user = useUser();
  if (!user.email) {
    return <Login/>;
  }
  else if(user.email){
    return <Logout/>;
  }
  else{
    return <h1>not working</h1>
  }
}

export default Authentication;
