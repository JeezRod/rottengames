import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Games from "./components/Games";
import Home from "./components/Home";
import GamePage from "./components/GamePage";
import {UserContext} from './UserContext';


function App() {

  //const [data, setData] = React.useState(null);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    async function getUser() {
      let response = await fetch('/api/user');
      if(response.status === 200){
        let userJson = await response.json();
        console.log("user: "+JSON.stringify(userJson))
        setUser(JSON.stringify(userJson));
        console.log("user1: "+ user)
        //console.log(userJson.admin)
      }
    }
    getUser();
    console.log("user2: "+ user)
    return () => mounted = false;
  }, [user]);

  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
    
  );
}

export default App;
