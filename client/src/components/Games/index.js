import React from "react";
import GridView from "../GridView";
import ReactPaginate from 'react-paginate';

function Games() {
  //State for page number
  const [page, setPage] = React.useState(1);
  //State for the total number of games
  const [totalGames, setTotalGames] = React.useState([]);
  //State for the number of games per page
  const [perPage, setPerPage] = React.useState(32);

  React.useEffect( () => {
    //Async function to fetch all the games
    async function fetchData() {
      //Fetching the data
      let data = await fetch("/api/games/count");
      let dataJson = await data.json();
      //Set the returned data
      await setTotalGames(dataJson);
    }
    fetchData();
  },[]);

  const handlePageClick = (event) => {
    console.log(event.selected)
    setPage(event.selected+1)
  };

  return (
      <div className="Games">
        <GridView page = {page}></GridView>

        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={5}
        pageCount={Math.ceil(totalGames/perPage)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </div>
      
  );
}

export default Games;