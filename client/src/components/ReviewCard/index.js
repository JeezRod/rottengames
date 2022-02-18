import React from "react";
import "./ReviewCard.css";
import StarRating from "../StarRating";

const ReviewCard = ({ review }) => {
  return (
    <div className="Rating">
      <div className="CommentCard">
        <p>{review.text}</p>
        <StarRating review={{ stars: 0 }}/>
      </div>
      <button className="UserButton">Comment</button>
      <button className="AdminButton">Delete</button>
    </div>
  )
}

export default ReviewCard;