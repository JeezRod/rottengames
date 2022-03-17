import React from "react";
//import "./ReviewCard.css";
import StarRating from "../StarRating";
import {useUser} from "../../UserContext"
import { Link } from "react-router-dom"

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
    <div className="Rating mb-1 flex items-center justify-between p-1 shadow-lg mb-8 mt-8 dark:shadow-white">

      <div className="CommentCard flex w-full justify-between leading-8 p-4">
        <div className="pfp flex items-center">
          <img src={userReview.picture} alt="pfp" className="w-12 h-12 object-cover mr-5 rounded-full content-center"></img>

          <div className="UserReview">
            <p className="font-bold text-2xl dark:text-white">{userReview.name}</p>
            <p className="text-xl dark:text-white">{review.text}</p>
          </div>
        </div>

        <div className="buttonStartContainer">
          <StarRating review={review} />
          {user.email &&
            <button className="UserButton ml-1.5 dark:text-black dark:bg-white dark:hover:bg-gray-600 dark:hover:text-white">Comment</button>
          }
          {(isAdmin || user.admin) &&
          <button className="AdminButton ml-1.5 dark:text-black dark:bg-white dark:hover:bg-gray-600 dark:hover:text-white">Delete</button>
          }
        </div>
      </div>

    </div>
  )
}

export default ReviewCard;