//RatingStar from https://www.npmjs.com/package/rating-star

import React from "react";
import { RatingStar } from "rating-star";


const StarRating = ({ review, isEditable, setRatingStars, ratingStars}) => {

  const onRatingChange = (score) => {
    setRatingStars(score);
  };

  if(isEditable){
    return (
      <div className="App">
        <RatingStar
          clickable
          maxScore={5}
          id={review.email}
          rating={ratingStars}
          onRatingChange={onRatingChange}
        />
      </div>
    );
  }
  return (
    <div className="App">
      <RatingStar
        maxScore={5}
        id={review.email}
        rating={review.ratingStars}
      />
    </div>
  );
}

export default StarRating;