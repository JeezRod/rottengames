import React from "react";
import "./Review.css"
import ReviewCard from "../ReviewCard";
import StarRating from "../StarRating";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";


function Review() {
  const params = useParams();
  //State for the games
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    //Async function to fetch all the games
    async function fetchData() {

      //Fetching the data
      let data = await fetch("/api/games/" + params.id);
      let dataJson = await data.json();
      //Set the returned data
      await setData(dataJson);
    }
    fetchData();
  }, [params.id]);

  //Link each button to their specific pages
  return (
    <div className="GamePage">

      <div className="GameInfo">
        <img className="GameCover" src={data.imageurl} alt={data.name}></img>
        <div className="NameStars">
          <h1>{data.name}</h1>
          <StarRating review={{ stars: data.averagerating }} />
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
        <ReviewCard review={{ text: "Game is cool!" }} />
        <ReviewCard review={{ text: "Game is awesome!" }} />
        <ReviewCard review={{ text: "Game is insane!" }} />
        <ReviewCard review={{ text: "Game is trash!" }} />
      </div>

    </div>
  );
}

export default Review;