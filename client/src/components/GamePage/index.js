import React from "react";
import ReviewCard from "../ReviewCard";
import StarRating from "../StarRating";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Alert from '@mui/material/Alert';
import {useUser, useUserUpdateContext} from "../../UserContext"



function Review() {
  const navigate = useNavigate();
  const params = useParams();
  //State for the games
  const [data, setData] = React.useState({ reviews: [{ "ratingStars": 0, "userId": "" }] });
  //State for the loading state
  const [loading, setLoading] = React.useState(false);
  //State for the average rating
  const [rating, setRating] = React.useState();
  //State for new review visibility
  const [newReviewBtn, setNewReviewBtn] = React.useState(false);
  //State for the rating of a new review
  const [ratingStars, setRatingStars] = React.useState(1);
  //State to trigger a "force rendering" of the page to load the new review from the db
  const [newComment, setNewComment] = React.useState(false);
  //State to check if the user is logged in or not
  const [loggedIn, setLoggedIn] = React.useState(false);
  //State to check if the user is logged in or not
  const [isAdmin, setIsAdmin] = React.useState(false);

  const user = useUser();

  //Initially Load the game
  React.useEffect(() => {
    //Async function to fetch all the games
    async function fetchGame() {
      await setLoading(true)
      //Fetching the data
      let data = await fetch("/api/games/" + params.id);
      let dataJson = await data.json();
      //Set the returned data
      await setData(dataJson);
      await setLoading(false)
    }
    fetchGame();
    setNewComment(false)
  }, [params.id, newComment]);

  //Computing the average rating
  React.useEffect(() => {
    (() => {
      try {
        //If there are at least 1 review for a game, calculate its average
        if (data.reviews.length > 0) {
          let ratingArray = data.reviews.map((review) => parseInt(review.ratingStars))
          const average = (ratingArray) => ratingArray.reduce((a, b) => a + b) / ratingArray.length;
          setRating(average(ratingArray))
        }
        //If there are no reviews for a game, set its rating at 0
        else {
          setRating(0)
        }
      } catch (e) {
        console.log("can't parse")
      }
    })();
  }, [data.reviews, rating]);

  //Display the buttons to add a review when input is focused
  const handleFocus = (event) => {
    if(user.email){
      setNewReviewBtn(true)
    }

  }

  //Loading animation before the game loads
  if (loading) {
    return (
      <div className='loading'>
        <ReactLoading type={"spin"} color="#000" />
      </div>
    )
  }

  //Async function used to add a new review to a specific game
  async function HandleSubmit(event) {
    event.preventDefault();
    try {
      let user = await fetch("/api/user")
      let userJson = await user.json()

      const url = ("/api/games/" + params.id)

      let text = event.target.reviewText.value
      // let name = userJson.name
      // let email = userJson.email
      let userId = userJson._id
      console.log(userJson)

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, userId, ratingStars })
      };
      fetch(url, requestOptions)
        .then(response => console.log('Submitted successfully'))
        .catch(error => console.log('Form submit error', error))

      //Force change state to refresh the page
      setNewComment(true)

    } catch (e) {
      console.log("no user")
    }
  }

  async function handleDelete(e){
    e.preventDefault();
    const confirmation = window.confirm("Are you sure you want to delete this game?");
    if(confirmation){
        await fetch("/api/games/delete/"+params.id, { method: 'DELETE' })
        window.alert("Game deleted");
        navigate("/games")
    }
  }

  //Link each button to their specific pages
  return (
    <div className="GamePage pl-28 pr-28 pt-14 pb-16">

      <div className="GameInfo flex">
        <img className="GameCover w-80 rounded-3xl" src={data.imageurl} alt={data.name}></img>
        <div className="NameStars flex items-center pl-10">
          <h1 className="text-5xl font-bold">{data.name}</h1>
          <StarRating review={{ ratingStars: rating, userId: "1234" }} />
          {/* () => navigate("/games") */}
          <form onSubmit={handleDelete}>
          {user.admin && 
            <button className="AdminButton">Delete Game</button>
            }
          </form>

          <Link to="">
            {user.admin && 
            <button className="AdminButton">Edit page</button>
            }

          </Link>

        </div>
      </div>

      <div className="Description pt-10">
        <h1 className="text-3xl font-bold">Description</h1>
        <p className="text-xl">{data.description}</p>
      </div>

      <div className="Platform pt-10">
        <h1 className="text-3xl font-bold">Available on</h1>
        <p className="text-xl">{data.platform}</p>
      </div>

      <div className="Review pt-10">
        <h1 className="text-3xl font-bold">Reviews</h1>
        
        {!user.email  &&
          <Alert severity="error">You have to login to add a comment!</Alert>
        }
        <form className="addReview flex justify-between flex-row items-center mt-10 mb-10" onSubmit={HandleSubmit}>
          {user.email &&
          <input className="w-5/6 h-11 border-0 focus:outline-none focus:border-black focus:border-b" required name="reviewText" type="text" placeholder="Add a review" onFocus={handleFocus}></input>
          }
          {newReviewBtn === true &&
            <><StarRating review={{ ratingStars: 0, userId: "1235" }} isEditable={true} setRatingStars={setRatingStars} ratingStars={ratingStars} />
              <button>Add Review</button></>
          }
        </form>

        {data.reviews.length > 0
          ? data.reviews.map(review => {
            return (
              <ReviewCard key={review.userId} review={review} />
            )
          })
          : <p className="text-2xl font-bold">No reviews</p>
        }
      </div>

    </div>
  );
}

export default Review;
//outline-none !important bottom-px