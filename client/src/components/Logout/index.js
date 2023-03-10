import React from "react";
import {GoogleLogout} from 'react-google-login';
import { useNavigate } from "react-router-dom";
import Translate from 'react-translate-component';


function Logout() {
  
  let navigate = useNavigate();
  //This method handles the google logout button
  const handleLogout = async () => {
  
    const res = await fetch("/api/v1/auth/logout", {
     method: "DELETE",
     
  },reload())}
  function reload(){
    window.location.reload(false);
  }
  return (
    <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={renderProps => (
            <Translate content="logout.logout" component="button" onClick={renderProps.onClick} className="mt-2 text-lg pr-4 pl-4"/>
          )}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
      />
  );
}

export default Logout;