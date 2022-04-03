import React from "react";
import GoogleLogin from 'react-google-login';
import Translate from 'react-translate-component';

function Login() {
  
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
    window.location.reload(false);
    //set the userName to the email
    //setUserName(data.email)
  }
  return (
    <GoogleLogin 
    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    render={renderProps => (
      <Translate content="login.login" component="button" onClick={renderProps.onClick} className="mt-2 text-lg pr-4 pl-4"/>
    )}
    buttonText="Login"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
  />
  );
}

export default Login;