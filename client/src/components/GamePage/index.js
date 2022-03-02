import React from "react";
import "./Review.css"
import ReviewCard from "../ReviewCard";
import StarRating from "../StarRating";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Alert from '@mui/material/Alert';


function Review() {
  const params = useParams();
  //State for the games
  const [data, setData] = React.useState({ reviews: [{ "ratingStars": 0, "email": "" }] });
  //State for the loading state
  const [loading, setLoading] = React.useState(false);
  //State for the average rating
  const [rating, setRating] = React.useState();
  //State for new review visibility
  const [newReviewBtn, setNewReviewBtn] = React.useState(false);
  //State for the rating of a new review
  const [ratingStars, setRatingStars] = React.useState(0);
  //State to trigger a "force rendering" of the page to load the new review from the db
  const [newComment, setNewComment] = React.useState(false);
  //State to check if the user is logged in or not
  const [loggedIn, setLoggedIn] = React.useState(false);

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
    async function checkLogin() {
      fetch('/api/user').then(response => {
        if (response.status === 200) {
          console.log("1")
           return response.json().then(setLoggedIn(true));
        }
        else {
          console.log("2")
          return response.json().then(setLoggedIn(false));
        }
      })
    }
    checkLogin();
    //Set the force render state back to false
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
    setNewReviewBtn(true)
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
      let name = userJson.name
      let email = userJson.email

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, name, email, ratingStars })
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

  //Link each button to their specific pages
  return (
    <div className="GamePage">

      <div className="GameInfo">
        <img className="GameCover" src={data.imageurl} alt={data.name}></img>
        <div className="NameStars">
          <h1>{data.name}</h1>
          <StarRating review={{ ratingStars: rating, email: "1234" }} />
          <Link to="">
            <button className="AdminButton">Edit page</button>
          </Link>
        </div>
      </div>

      <div className="Description">
        <h1>Description</h1>
        <p>{data.description}</p>
      </div>

      <div className="Review">
        <h1>Reviews</h1>
        
        {loggedIn === false &&
          <Alert severity="error">You have to login to add a comment!</Alert>
        }
        <form className="addReview" onSubmit={HandleSubmit}>
          <input name="reviewText" type="text" placeholder="Add a review" onFocus={handleFocus}></input>
          {newReviewBtn === true &&
            <><StarRating review={{ ratingStars: 0, email: "1235" }} isEditable={true} setRatingStars={setRatingStars} ratingStars={ratingStars} /><button>Add Review</button></>
          }
        </form>

        {data.reviews.length > 0
          ? data.reviews.map(review => {
            return (
              <ReviewCard key={review.email} review={review} />
            )
          })
          : <p>No reviews</p>
        }
      </div>

    </div>
  );
}

export default Review;