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
  const [data, setData] = React.useState({reviews:[]});
  //State for the loading state
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    //Async function to fetch all the games
    async function fetchData() {
      console.log("fetching")
      await setLoading(true)
      //Fetching the data
      let data = await fetch("/api/games/" + params.id);
      let dataJson = await data.json();
      //Set the returned data
      await setData(dataJson);
      await setLoading(false)
      console.log(data);
    }
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className='loading'>
        <ReactLoading type={"spin"} color="#000" />
      </div>
    )
  }

  //Link each button to their specific pages
  return (
    <div className="GamePage">

      <div className="GameInfo">
        <img className="GameCover" src={data.imageurl} alt={data.name}></img>
        <div className="NameStars">
          <h1>{data.name}</h1>
          <StarRating review={{ rating: 0, email:"123" }} />
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
        {data.reviews.map(review => {
          return (
            <ReviewCard key={review.email} review={review} />
          )
        })}
      </div>

    </div>
  );
}

export default Review;