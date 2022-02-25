import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Games from "./components/Games";
import Home from "./components/Home";
import Register from "./components/Register";
import GamePage from "./components/GamePage";


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
        <Route path="games/:id" element={<GamePage />}/>
      </Routes>
    </Router>
  );
}

export default App;
