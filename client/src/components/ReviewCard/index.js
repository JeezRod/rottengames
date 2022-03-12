import React from "react";
import "./ReviewCard.css";
import StarRating from "../StarRating";
import {useUser} from "../../UserContext"
import { Link } from "react-router-dom"

const ReviewCard = ({ review, isAdmin, loggedIn }) => {

  const [profilePicture, setProfilePicture] = React.useState("");
  const user = useUser();

  //Fetch the profile picture for the specific email
  React.useEffect(() => {
    async function fetchData() {
      let data = await fetch("/api/user/profile/picture?email=" + review.email);
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
            <Link className="link" to={"/profile/"+review.userId}>
              <p><strong>{review.name}</strong></p>
            </Link>
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