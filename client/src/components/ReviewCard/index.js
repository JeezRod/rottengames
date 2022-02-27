import React from "react";
import "./ReviewCard.css";
import StarRating from "../StarRating";

const ReviewCard = ({ review }) => {

  const [profilePicture, setProfilePicture] = React.useState("");

  //Fetch the profile picture for the specific email
  React.useEffect(() => {
    async function fetchData() {
      let data = await fetch("/api/user/pfp?email=" + review.email);
      let dataJson = await data.json();
      setProfilePicture(dataJson)
    }
    fetchData();
  }, [review.email]);

  return (
    <div className="Rating">

      <div className="CommentCard">
        <div className="pfp">
          <img src={profilePicture} alt="pfp"></img>

          <div className="UserReview">
            <p><strong>{review.name}</strong></p>
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