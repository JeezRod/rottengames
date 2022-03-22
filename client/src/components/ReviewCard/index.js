import React from "react";
//import "./ReviewCard.css";
import StarRating from "../StarRating";
import {useUser} from "../../UserContext"
import { Link } from "react-router-dom"

const ReviewCard = ({ gameId, review, isAdmin }) => {

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

  // This function fetches the delete game api when delete game is clicked.
  async function handleDelete(e){
   // e.preventDefault();
    const confirmation = window.confirm("Are you sure you want to delete this game?");
    console.log("GameId: "+gameId);
    console.log("UserId: "+review.userId)
    if(confirmation){
        await fetch("/api/games/delete/"+gameId+"/"+review.userId, { method: 'DELETE' })
        window.alert("Game deleted");
    }
  }

  return (
    <div className="Rating my-4 flex items-center justify-between p-1 shadow-lg dark:bg-gray-800">

      <div className="CommentCard flex-row md:flex w-full justify-between leading-8 lg:p-4">
        <div className="pfp flex w-full items-start md:w-9/12 md:items-center">
          <img src={userReview.picture} alt="pfp" className="w-12 h-12 object-cover mr-5 rounded-full content-center"></img>

          <div className="UserReview">
            <Link to={"/profile/"+userReview._id}>
              <p className="font-bold text-2xl dark:text-white">{userReview.name}</p>
            </Link>
            <p className="text-xl dark:text-white">{review.text}</p>
          </div>
        </div>

        <div className="buttonStartContainer flex flex-col items-center">
          <StarRating review={review} />
          {user.email &&
            <button className="UserButton  my-0.5 ">Comment</button>
          }
          {(isAdmin || user.admin) &&
          <form onSubmit={handleDelete}>
            <button className="AdminButton px-5 my-0.5 ">Delete</button>
          </form>
          }
        </div>
      </div>

    </div>
  )
}

export default ReviewCard;