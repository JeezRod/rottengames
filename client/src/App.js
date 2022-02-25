import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Games from "./components/Games";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import GamePage from "./components/GamePage";
import Dashboard from "./components/Dashboard";


function App() {
  
  const [data, setData] = React.useState(null);
  
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
      </div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About/>}/>
        <Route path="games" element={<Games/>}/>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="games/:id" element={<GamePage />}/>
        <Route path="dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
