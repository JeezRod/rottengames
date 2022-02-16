import React from "react";
import "./Review.css"
import HaloInf from "./Images/HaloInf.png";

function Review() {
  return (
      <div className="GamePage">
          <div className="GameInfo">
          <img src={HaloInf} alt="HaloInfinite"></img>
            <h1>Halo Infinite</h1>
            <p>rating stars api</p>
            <p>Description</p>
          </div>
        <div className="Review">
            <h1>Reviews</h1>

            <div className="Rating">
                <p>This game is awesome!</p>
                <button className="AdminButton">Delete</button>
            </div>

            <div className="Rating">
                <p>This game is awesome!</p>
                <button className="UserButton">Comment</button>
            </div>

                <button className="AdminButton">Edit page</button>

                <button className="AdminButton">Remove Game</button>

                <button className="UserButton">Add Review</button>

        </div>

      </div>
      
  );
}

export default Review;