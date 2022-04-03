import React from "react";
import StarRating from "../StarRating";
import {useUser} from "../../UserContext"
import { Link } from "react-router-dom"
import Translate from 'react-translate-component';

const ReviewCard = ({ gameId, review, isAdmin }) => {

  const [userReview, setUserReview] = React.useState("");
  const user = useUser();

  //Fetch the profile picture for the specific email
  React.useEffect(() => {
    async function fetchData() {
      let data = await fetch("/api/users/" + review.userId);
      let dataJson = await data.json();
      setUserReview(dataJson)
    }
    fetchData();
  }, [review.userId]);

  // This function fetches the delete game api when delete game is clicked.
  async function handleDelete(e){
    const confirmation = window.confirm("Are you sure you want delete to this review?");
    console.log("GameId: "+gameId);
    console.log("UserId: "+review.userId)
    if(confirmation){
        await fetch("/api/games/"+gameId+"/"+review.userId, { method: 'DELETE' })
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
          {(isAdmin || user.admin || user.id === userReview._id ) &&
          <form onSubmit={handleDelete}>
            <Translate content="reviewCard.delete" component="button" className="AdminButton px-5 my-0.5"/>
          </form>
          }
        </div>
      </div>

    </div>
  )
}

export default ReviewCard;