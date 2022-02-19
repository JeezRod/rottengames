import React from "react";
import GridView from "../GridView";
import ReactPaginate from 'react-paginate';
import "./Games.css"

function Games() {
  //State for page number
  const [page, setPage] = React.useState(1);
  //State for the total number of games
  const [totalGames, setTotalGames] = React.useState([]);
  //State for the number of games per page
  const [perPage, setPerPage] = React.useState(32);

  React.useEffect( () => {
    //Async function to fetch count of all games
    async function fetchData() {
      //Fetching the data
      let data = await fetch("/api/games/count");
      let dataJson = await data.json();
      //Set the returned data
      await setTotalGames(dataJson);
    }
    fetchData();
  },[]);

  //Function to set the page everytime a new page has been clicked 
  const handlePageClick = (event) => {
    //Sets the page which will rerender the Gridview with the right page
    setPage(event.selected+1)
  };

  return (
      <div className="Games">
        <GridView page = {page}></GridView>

        <ReactPaginate
        breakLabel="..."
        nextLabel="➜"
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={3}
        pageCount={Math.ceil(totalGames/perPage)}
        previousLabel="➜"
        renderOnZeroPageCount={null}

        containerClassName="paginator"
        activeClassName="currentPage"
        pageClassName="pages"
        nextClassName="next"
        previousClassName="previous"
        breakLinkClassName="break"
       />
      </div>
      
  );
}

export default Games;