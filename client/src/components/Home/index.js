import React from "react";
import LandingImg from "../../assets/landingImg.jpg"
import "./Home.css"

function Home() {

  return (
      <main className="Home">
          <img src={LandingImg} alt="Landing"></img>
          <div id="landing">
            <div>
              <h1>Rotten Games</h1>
              <h4>Search. Review. Assist.</h4>
              <button>Register Now!</button>
            </div>
          </div>
      </main>
  );
}

export default Home;