import React from "react";
import ReviewCard from "../ReviewCard";
import StarRating from "../StarRating";
import { useNavigate } from 'react-router';
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Alert from '@mui/material/Alert';
import { useUser } from "../../UserContext"
import Translate from 'react-translate-component';


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
  //State for editing mode
  const [isEdit, setIsEdit] = React.useState(false)

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
    if (user.email) {
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
      let user = await fetch("/api/users")
      let userJson = await user.json()
      const url = ("/api/games/" + params.id + "/review")
      let text = event.target.reviewText.value
      let userId = userJson._id
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

  // This function fetches the delete game api when delete game is clicked.
  async function handleDelete(e) {
    e.preventDefault();
    const confirmation = window.confirm("Are you sure you want to delete this game?");
    if (confirmation) {
      await fetch("/api/games/" + params.id, { method: 'DELETE' })
      window.alert("Game deleted");
      navigate("/games")
    }
  }

  // Sets the isEdit constant to opposite boolean when edit game button is clicked.
  const handleClick = (e) => {
    e.preventDefault();
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }

  // This function fetches the edit game route api when save button is clicked.
  async function handleSave(e) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.name.value,
        description: e.target.description.value,
        handle: "gamePage"
      })
    };
    await fetch("/api/games/" + params.id, requestOptions)
    window.alert(requestOptions);
    setIsEdit(false)
  }

  // When cancel button is clicked, this constant sets the isEdit constant to false.
  const handleCancel = (e) => {
    e.preventDefault()
    setIsEdit(false)
  }

  // Link each button to their specific pages
  return (
    <div className="GamePage px-4 md:px-8 lg:px-28 pt-32 pb-16">

      <form onSubmit={handleSave}>
        <div className="GameInfo flex lg:flex-row flex-col ">
          <img className="GameCover w-100 lg:w-80 rounded-3xl" src={data.imageurl} alt={data.name}></img>
          <div className="NameStars flex flex-col my-auto px-5 lg:pl-10">
            {isEdit
              ? <textarea className='nameText text-4xl text-center lg:text-left dark:text-white bg-gray-300' name="name" defaultValue={data.name}></textarea>
              : <p className="text-5xl text-center lg:text-left font-bold dark:text-white">{data.name}</p>
            }

            <StarRating review={{ ratingStars: rating, userId: "1234" }} />

            <div>
              {isEdit
                ? 
                <div className='gameSection flex flex-col lg:flex-row w-48 mx-auto'>{user.admin && <Translate content="gamePage.save" component="button" className="m-2"/>}{user.admin && <Translate content="gamePage.cancel" component="button" className="m-2" onClick={handleCancel}/>}</div>
                : <div className='gameSection flex flex-col lg:flex-row w-48 mx-auto lg:mx-0'>{user.admin && <Translate content="gamePage.editPage" component="button" onClick={handleClick}/>} </div>

              }
            </div>
          </div>
        </div>

        <div className="Description pt-10 dark:text-white">
          <Translate content="gamePage.description" component="p" className="text-3xl font-bold"/>
          {isEdit
            ? <textarea className='descriptionText dark:text-white w-3/4 text-xl bg-gray-300' name="description" defaultValue={data.description}></textarea>
            : <p className="text-xl">{data.description}</p>
          }
        </div>
      </form>

      <div className="Platform pt-10 dark:text-white">
        <Translate content="gamePage.availableOn" component="p" className="text-3xl font-bold" />
        <p className="text-xl">{data.platform}</p>
      </div>

      <form className="float-right w-48" onSubmit={handleDelete}>
        {user.admin &&
        <Translate content="gamePage.deleteGame" component="button" className="w-48 bg-red-600 hover:bg-red-700 dark:bg-rose-600 dark:hover:bg-rose-700"/>
        }
      </form>

      <div className="Review pt-10 dark:text-white">
        <Translate content="gamePage.reviews" component="h1" className="text-3xl font-bold" />

        {!user.email &&

          <Alert severity="error"><Translate content="gamePage.loginToComment" /></Alert>
        }
        <form className="addReview flex justify-between flex-row items-center mt-10 mb-10" onSubmit={HandleSubmit}>
          {user.email &&
            <Translate component="input" name="reviewText" type="text" attributes={{ placeholder: "gamePage.placeHolder" }} onFocus={ handleFocus } className="w-5/6 h-11 border-0 focus:outline-none focus:border-black focus:border-b" />
          }
          {newReviewBtn === true &&
            <><StarRating review={{ ratingStars: 0, userId: "1235" }} isEditable={true} setRatingStars={setRatingStars} ratingStars={ratingStars} />
              <Translate content="gamePage.addReview" component="button" /></>
          }
        </form>

        {data.reviews.length > 0
          ? data.reviews.map(review => {
            return (
              <ReviewCard key={review.userId} review={review} gameId={params.id} />
            )
          })
          : 
          <Translate content="gamePage.noReviews" component="p" className="text-2xl font-bold"/>
        }
      </div>

    </div>
  );
}

export default Review;
//outline-none !important bottom-px