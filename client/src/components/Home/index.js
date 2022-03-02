import React from "react";
import LandingImg from "../../assets/landingImg.jpg"
import "./Home.css"
import { Link } from "react-router-dom"

function Home() {

  return (
    <main className="Home">
      <img src={LandingImg} alt="Landing"></img>
      <div id="landing">
        <div>
          <h1>Rotten Games</h1>
          <h4>Search. Review. Assist.</h4>
          <Link to="/register">
            <button>Register Now!</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;