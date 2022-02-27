import React from "react";
import GoogleLogout from 'react-google-login';

function Logout() {
  
  //This method handles the google logout button
  const handleLogout = async response => {
  
    const res = await fetch("/api/v1/auth/logout", {
     method: "DELETE",
 
  })
  console.log("logout is getting called")
  }
  return (
    <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
      />
  );
}

export default Logout;