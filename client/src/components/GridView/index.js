import React from 'react'
import GameCard from '../GameCard'
import './GridView.css'
import ReactLoading from "react-loading";

function GridView(){
  //State for the games
  const [data, setData] = React.useState([]);
  //State for the loading state
  const [loading, setLoading] = React.useState(false)
  
  React.useEffect( () => {
    //Async function to fetch all the games
    async function fetchData() {
      try{

      setLoading(true)
      let data = await fetch("/api/games");
      let dataJson = await data.json();
      await setData(dataJson);
      
      } catch(e){
        console.log("Fetch error")
      } finally{
        setLoading(false)
      }
    }
    fetchData();
  },[]);
  
  //If the games are loading show loading prompt
  if(loading){
    return  (
      <div className='loading'>
      <ReactLoading type={"spin"} color="#000" />
      </div>
      )
  }
  
  //Else render the gridview of all the games
  return (
    <div className='gridview'>
      {data.map(game => {
            return <GameCard key={game._id.$oid} game={game}/>
      })}
    </div>
  )
}

export default GridView