import React from "react";
import GridView from "../GridView";
import Filter from "../Filter"
import ReactPaginate from 'react-paginate';
import "./Games.css"

function Games() {
  //State for page number
  const [page, setPage] = React.useState(1);
  //State for the total number of games
  const [totalGames, setTotalGames] = React.useState([]);
  //State for the number of games per page
  const [perPage, setPerPage] = React.useState(30);

  const [searchTerm, setSearchTerm] = React.useState('');

  const [searchPlatform, setSearchPlatform] = React.useState('');

  React.useEffect(() => {
    //Async function to fetch count of all games
    async function fetchData() {
      if (searchPlatform.length > 0) {
        let url = "/api/games/count?name=" + searchTerm;
        for (let i = 0; i < searchPlatform.length; i++) {
          url = url + "&platform=" + searchPlatform[i];
        }
        //Fetching the data
        let data = await fetch(url);
        let dataJson = await data.json();
        //Set the returned data
        await setTotalGames(dataJson);
      }
      else{
        //Fetching the data
        let data = await fetch("/api/games?page=" + page + "&name=" + searchTerm + "&size=" + perPage);
        let dataJson = await data.json();
        //Set the returned data
        await setTotalGames(dataJson);
      }
    }
    fetchData();
    //Resets the page to 1 when a new search time is entered
    setPage(1)
  }, [searchTerm, searchPlatform, page, perPage]);

  //Function to set the page everytime a new page has been clicked 
  const handlePageClick = (event) => {
    //Scrolls the page back to the top when rerender the grid
    window.scrollTo(0, 0)
    //Sets the page which will rerender the Gridview with the right page
    setPage(event.selected + 1)

  };

  return (
    <div className="Games">
      <div className="MainContainer">
        <Filter setSearchTerm={setSearchTerm} setSearchPlatform={setSearchPlatform}></Filter>
        <div className="GridPaginator">
          <GridView page={page} searchTerm={searchTerm} searchPlatform={searchPlatform} perPage={perPage}></GridView>

          <ReactPaginate
            breakLabel="..."
            nextLabel="➜"
            onPageChange={handlePageClick}
            pageRangeDisplayed={0}
            marginPagesDisplayed={3}
            pageCount={Math.ceil(totalGames / perPage)}
            previousLabel="➜"
            renderOnZeroPageCount={null}
            forcePage={page - 1}

            containerClassName="paginator"
            activeClassName="currentPage"
            pageClassName="pages"
            nextClassName="next"
            previousClassName="previous"
            breakLinkClassName="break"
          />
        </div>
      </div>
    </div>

  );
}

export default Games;