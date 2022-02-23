//RatingStar from https://www.npmjs.com/package/rating-star

import React from "react";
import { RatingStar } from "rating-star";


const StarRating = ({ review }) => {

  return (
    <div className="App">
      <RatingStar
        maxScore={5}
        id={review.email}
        rating={review.rating}
      />
    </div>
  );
}

export default StarRating;