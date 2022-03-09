import React from 'react'
import GameCard from '../GameCard'
import './GridView.css'
import ReactLoading from "react-loading";
import { Link } from "react-router-dom"


function GridView({ page, searchTerm, perPage, searchPlatform }) {
  //State for the games
  const [data, setData] = React.useState([]);
  //State for the loading state
  const [loading, setLoading] = React.useState(false);
  //State for error
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    //Async function to fetch all the games
    async function fetchData() {
      try {
        //Set loading to true
        setLoading(true)
        if (searchPlatform.length > 0) {
          let url = "/api/games?page=" + page + "&name=" + searchTerm + "&size=" + perPage;
          for (let i = 0; i < searchPlatform.length; i++) {
            url = url + "&platform=" + searchPlatform[i];
          }
          //Fetching the data
          let data = await fetch(url);
          let dataJson = await data.json();
          //Set the returned data
          await setData(dataJson);
        }
        else{
          //Fetching the data
          let data = await fetch("/api/games?page=" + page + "&name=" + searchTerm + "&size=" + perPage);
          let dataJson = await data.json();
          //Set the returned data
          await setData(dataJson);
        }
        //No error has occured, set error to false
        setError(false)
      } catch (e) {
        //Error has occured, set error to true
        setError(true)
      } finally {
        //Loading completed, set loading to false
        setLoading(false)
      }
    }
    fetchData();
  }, [page, searchTerm, perPage, searchPlatform]);

  //If the games are loading show loading prompt
  if (loading) {
    return (
      <div className='loading'>
        <ReactLoading type={"spin"} color="#000" />
      </div>
    )
  }

  //If there is an issue in loading the games show error message
  if (error) {
    return (
      <div className='griderror'>
        <p>An error has occured</p>
      </div>
    )
  }

  //Else render the gridview of all the games
  return (
    <div className='gridview' >
      {data.map(game => {
        return (
          <Link key={game._id} className="link" to={game._id}>
            <GameCard game={game} />
          </Link>
        )
      })}
    </div>
  )
}

export default GridView