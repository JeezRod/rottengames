import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Games from "./components/Games";
import Home from "./components/Home";
import GamePage from "./components/GamePage";
import { UserProvider } from './UserContext';
import Dashboard from "./components/Dashboard";
import AddGame from "./components/AddGame";
import UserProfile from "./components/UserProfile";


function App() {

  return (
<<<<<<< HEAD
    <Router>
      <div className="NavContainer" >
        <Navbar ></Navbar>
        <br></br>
      </div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About/>}/>
        <Route path="games" element={<Games/>}/>
        <Route path="games/:id" element={<GamePage />}/>
        <Route path="dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
=======
    <UserProvider>
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
          <Route path="games/:id" element={<GamePage />}/>
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="profile/:id" element={<UserProfile />}/>
          <Route path="dashboard/addGame" element={<AddGame />} />
        </Routes>
      </Router>
    </UserProvider>
    
>>>>>>> ff3dc3f1079f296f2e3b4869a65c587cd1549d9b
  );
}

export default App;
