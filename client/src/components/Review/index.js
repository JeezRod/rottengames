import React from "react";
import "./Review.css"
import HaloInf from "./Images/HaloInf.png";
import ReviewCard from "../ReviewCard";
import StarRating from "../StarRating";
import {Link} from "react-router-dom"

function Review(game) {

  //Link each button to their specific pages
  return (
    <div className="GamePage">

      <div className="GameInfo">
        <img className="GameCover" src={HaloInf} alt="HaloInfinite"></img>
        <div className="NameStars">
          <h1>Halo Infinite</h1>
          <StarRating />
          <Link to="">
          <button className="AdminButton">Edit page</button>
          </Link>
        </div>
      </div>

      <div className="Description">
        <h1>Description</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

      <div className="Review">
        <h1>Reviews</h1>
        <ReviewCard review={{ text: "Game is cool!" }} />
        <ReviewCard review={{ text: "Game is awesome!" }} />
        <ReviewCard review={{ text: "Game is insane!" }} />
        <ReviewCard review={{ text: "Game is trash!" }} />
      </div>

    </div>
  );
}

export default Review;