import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Games from "./components/Games";
import Home from "./components/Home";
import GamePage from "./components/GamePage";
import { UserProvider } from './UserContext';


function App() {

  return (
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
        </Routes>
      </Router>
    </UserProvider>
    
  );
}

export default App;
