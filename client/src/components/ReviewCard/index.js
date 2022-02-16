import React from "react";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  return (
    <div className="Rating">
      <div className="CommentCard">
        <p>{review.text}</p>
      </div>
      <button className="UserButton">Comment</button>
      <button className="AdminButton">Delete</button>
    </div>
  )
}

export default ReviewCard;