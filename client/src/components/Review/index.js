import React from "react";
import "./Review.css"
import HaloInf from "./Images/HaloInf.png";
import ReviewCard from "../ReviewCard";

function Review(game) {
  return (
      <div className="GamePage">
          <div className="GameInfo">
            <img className="GameCover" src={HaloInf} alt="HaloInfinite"></img>
            <div className="NameStars">
              <h1>Halo Infinite</h1>
              <p>rating stars api</p>
              <button className="AdminButton">Edit page</button>
            </div>
          </div>

        <div className="Description">
          <p>Description</p>
        </div>
        <div className="Review">
            <h1>Reviews</h1>

            <ReviewCard review={{text: "Game is cool!"}}/>

        </div>

      </div>
      
  );
}

export default Review;