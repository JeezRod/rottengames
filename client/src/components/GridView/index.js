import React from 'react'
import GameCard from '../GameCard'
import './GridView.css'
import ReactLoading from "react-loading";


function GridView({ page, searchTerm }) {
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

        //Fetching the data for the specific page
        let data = await fetch("/api/games?page=" + page.page + "&name=" + searchTerm);
        let dataJson = await data.json();
        //Set the returned data
        await setData(dataJson);

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
  }, [page, searchTerm]);

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
    <div className='gridview'>
      {data.map(game => {
        return <GameCard key={game._id} game={game} />
      })}
    </div>
  )
}

export default GridView