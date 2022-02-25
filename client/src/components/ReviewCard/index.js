import React from "react";
import "./ReviewCard.css";
import StarRating from "../StarRating";

const ReviewCard = ({ review }) => {
  return (
    <div className="Rating">

      <div className="CommentCard">
        <div className="pfp">
          <img src="https://lh3.googleusercontent.com/a/AATXAJza_xmVChUyzU31XGCQdRUp9eHdvvSEylcADpvuyA=s96-c" alt="pfp"></img>

          <div className="UserReview">
            <p><strong>{review.email}</strong></p>
            <p>{review.text}</p>
          </div>
        </div>

        <div className="buttonStartContainer">
          <StarRating review={review} />
          <button className="UserButton">Comment</button>
          <button className="AdminButton">Delete</button>
        </div>
      </div>

    </div>
  )
}

export default ReviewCard;