import React from "react";
import "./Review.css"
import ReviewCard from "../ReviewCard";
import StarRating from "../StarRating";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";


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

  const [newComment, setNewComment] = React.useState(false);

  //Initially Load the game
  React.useEffect(() => {
    //Async function to fetch all the games
    async function fetchData() {
      await setLoading(true)
      //Fetching the data
      let data = await fetch("/api/games/" + params.id);
      let dataJson = await data.json();
      //Set the returned data
      await setData(dataJson);
      await setLoading(false)
    }
    fetchData();
    setNewComment(false)
  }, [params.id, newComment]);

  //Computing the average rating
  React.useEffect(() => {
    (() => {
      try{
        if (data.reviews.length > 0) {
          let ratingArray = data.reviews.map((review) => parseInt(review.ratingStars))
          const average = (ratingArray) => ratingArray.reduce((a, b) => a + b) / ratingArray.length;
          setRating(average(ratingArray))
        }
        else {
          setRating(0)
        }
      } catch (e){
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

  async function HandleSubmit(event) {
    event.preventDefault();
    try{
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
  
      setNewComment(true)

    } catch (e){
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