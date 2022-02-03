import React from "react";
import LandingImg from "../../assets/landingImg.jpg"
import "./Home.css"

function Home() {

  return (
      <main className="Home">
          <img src={LandingImg} alt="Landing"></img>
      </main>
      
  );
}

export default Home;