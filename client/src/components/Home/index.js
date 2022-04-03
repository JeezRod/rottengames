import React from "react";
import LandingImg from "../../assets/landingImg.jpg";
import { Link } from "react-router-dom";
import Translate from 'react-translate-component';

function Home() {

  return (
    <main className="Home flex justify-between items-center">
      <img src={LandingImg} alt="Landing" className="lg:w-3/6  lg:h-screen object-cover h-screen w-screen lg:items-stretch "></img>
      <div className="lg:landing lg:w-3/6 lg:h-full lg:flex lg:flex-col lg:pl-24 lg:justify-center lg:text-4xl lg:leading-loose lg:relative  lg:inset-auto absolute inset-y-auto left-24 text-white">
        <div className="dark:text-white lg:text-black text-white">
          <p className="font-bold text-7xl">Rotten Games</p>
          <Translate content="home.catchPhrase" component="p"/>
          <Link to="/games">
            <Translate content="home.searchNow" component="button" className="mt-6 text-lg pr-4 pl-4 bg-black hover:bg-gray-700 text-white" />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;