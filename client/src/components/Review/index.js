import React from "react";
import "./Review.css"
import ReviewCard from "../ReviewCard";
import StarRating from "../StarRating";
import {Link} from "react-router-dom"

function Review(game) {
  //State for the games
  const [data, setData] = React.useState([]);
  //State for the loading state
  const [loading, setLoading] = React.useState(false);
  //State for error
  const [error, setError] = React.useState(false);

  React.useEffect( () => {
    //Async function to fetch all the games
    async function fetchData() {
      try{
      //Set loading to true
      setLoading(true)
      
      //Fetching the data
      let data = await fetch("/api/games/620fe48fdcea5f127408572f");
      let dataJson = await data.json();
      //Set the returned data
      await setData(dataJson);

      //No error has occured, set error to false
      setError(false)

      } catch(e){
        //Error has occured, set error to true
        setError(true)
      } finally{
        //Loading completed, set loading to false
        setLoading(false)
      }
    }
    fetchData();
  },[]);

  //Link each button to their specific pages
  return (
    <div className="GamePage">

      <div className="GameInfo">
        <img className="GameCover" src={data.imageurl} alt="HaloInfinite"></img>
        <div className="NameStars">
          <h1>{data.name}</h1>
          <StarRating review={{ stars: data.averagerating }}/>
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
        <ReviewCard review={{ text: "Game is cool!"}} />
        <ReviewCard review={{ text: "Game is awesome!" }} />
        <ReviewCard review={{ text: "Game is insane!" }} />
        <ReviewCard review={{ text: "Game is trash!" }} />
      </div>

    </div>
  );
}

export default Review;