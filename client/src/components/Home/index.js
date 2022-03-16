import React from "react";
import LandingImg from "../../assets/landingImg.jpg"
import { Link } from "react-router-dom"

function Home() {

  return (
    <main className="Home flex justify-between items-center h-full">
      <img src={LandingImg} alt="Landing" className="h-screen w-3/6 h-full object-cover items-stretch"></img>
      <div className="landing w-3/6 h-full flex flex-col pl-24 justify-center text-4xl leading-loose">
        <div>
          <p className="font-bold text-7xl dark:text-white">Rotten Games</p>
          <p className="dark:text-white">Search. Review. Assist.</p>
          <Link to="/games">
            <button className="mt-6 text-lg pr-4 pl-4 dark:bg-white dark:text-black dark:text-black dark:bg-white dark:hover:bg-gray-600 dark:hover:text-white">Search Now !</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;