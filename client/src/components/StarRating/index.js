//API used: RatingStar from https://www.npmjs.com/package/rating-star

import React from "react";
import { RatingStar } from "rating-star";

const StarRating = ({ review, isEditable, setRatingStars, ratingStars }) => {

  //Function called to change the ratingStars
  const onRatingChange = (score) => {
    setRatingStars(score);
  };

  const appClass = "App flex lg:flex-row flex-col"

  //If it is a new review, make the ratingStars clickable
  if (isEditable) {
    return (
      <div className={appClass}>
        <RatingStar
          clickable
          maxScore={5}
          id={review.userId}
          rating={ratingStars}
          onRatingChange={onRatingChange}
        />
      </div>
    );
  }
  //Used for the average rating of all the reviews of the game, not editable
  return (
    
    <div className={appClass}>
      <RatingStar
        maxScore={5}
        id={review.userId}
        rating={review.ratingStars}
      />
    </div>
  );
}

export default StarRating;