import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Games from "./components/Games";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import GoogleLogin, { GoogleLogout } from 'react-google-login';

function App() {

  const [data, setData] = React.useState(null);
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
    const data = await res.json()
    console.log("email:"+data.email)
    setUserName(data.email)
  }

  const handleLogout = async response => {
  
    const res = await fetch("/api/v1/auth/logout", {
     method: "DELETE",
 
 })
 const data = await res.json()
 setUserName("");
}


  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Router>
      <div className="NavContainer">
        <Navbar ></Navbar>
        <br></br>
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

      </div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="games" element={<Games />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
