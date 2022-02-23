import React from "react";
import "./ReviewCard.css";
import StarRating from "../StarRating";

const ReviewCard = ({ review }) => {
  return (
    <div className="Rating">
      <div className="CommentCard">
        <div className="UserReview">
        <p>{review.email}</p>
        <p>{review.text}</p>
        </div>
        <StarRating review={review}/>
      </div>
      <button className="UserButton">Comment</button>
      <button className="AdminButton">Delete</button>
    </div>
  )
}

export default ReviewCard;