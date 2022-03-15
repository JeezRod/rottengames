import React from "react";
import "./ReviewCard.css";
import StarRating from "../StarRating";
import {useUser, useUserUpdateContext} from "../../UserContext"

const ReviewCard = ({ review, isAdmin, loggedIn }) => {

  const [userReview, setUserReview] = React.useState("");
  const user = useUser();

  //Fetch the profile picture for the specific email
  React.useEffect(() => {
    async function fetchData() {
      let data = await fetch("/api/user/" + review.userId);
      let dataJson = await data.json();
      setUserReview(dataJson)
    }
    fetchData();
  }, [review.userId]);

  return (
    <div className="Rating">

      <div className="CommentCard">
        <div className="pfp">
          <img src={userReview.picture} alt="pfp"></img>

          <div className="UserReview">
            <p><strong>{userReview.name}</strong></p>
            <p>{review.text}</p>
          </div>
        </div>

        <div className="buttonStartContainer">
          <StarRating review={review} />
          {user.email &&
            <button className="UserButton">Comment</button>
          }
          {(isAdmin || user.admin) &&
          <button className="AdminButton">Delete</button>
          }
        </div>
      </div>

    </div>
  )
}

export default ReviewCard;