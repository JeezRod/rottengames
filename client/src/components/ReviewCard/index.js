import React from "react";
//import "./ReviewCard.css";
import StarRating from "../StarRating";
import {useUser, useUserUpdateContext} from "../../UserContext"

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
    <div className="Rating mb-1 flex items-center justify-between p-1 shadow-lg mb-8 mt-8">

      <div className="CommentCard flex w-full justify-between leading-8">
        <div className="pfp flex items-center">
          <img src={profilePicture} alt="pfp" className="w-24 h-24 object-cover mr-5 rounded-full content-center"></img>

          <div className="UserReview">
            <p className="font-bold text-2xl">{review.name}</p>
            <p className="text-xl">{review.text}</p>
          </div>
        </div>

        <div className="buttonStartContainer">
          <StarRating review={review} />
          {user.email &&
            <button className="UserButton ml-1.5">Comment</button>
          }
          {(isAdmin || user.admin) &&
          <button className="AdminButton ml-1.5">Delete</button>
          }
        </div>
      </div>

    </div>
  )
}

export default ReviewCard;