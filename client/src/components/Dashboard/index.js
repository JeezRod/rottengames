import React from "react";
//import "./Dashboard.css"
import ReactPaginate from 'react-paginate';
import Users from "../AllUsers";
import { Link } from "react-router-dom"

function Dashboard() {

  const [page, setPage] = React.useState(1);

  const [totalUsers, setTotalUsers] = React.useState([]);

  const [perPage, setPerPage] = React.useState(12);

  const [searchTerm, setSearchTerm] = React.useState('');

  //TailwindCSS for the buttons
  const buttonStyle = "m-1.5 p-10 rounded-none w-full bg-white text-black shadow-xl h-60 mt-10px transition ease-in-out duration-300 hover:shadow-2xl";

  React.useEffect(() => {
    //Async function to fetch count of all games
    async function fetchData() {
      //Fetching the data
      let data = await fetch("/api/users/count?name=" + searchTerm);
      let dataJson = await data.json();
      //Set the returned data
      await setTotalUsers(dataJson);
    }
    fetchData();
  }, [searchTerm]);

    //Function to set the page everytime a new page has been clicked 
    const handlePageClick = (event) => {
      //Scrolls the page back to the top when rerender the grid
      window.scrollTo(0, 0)
      //Sets the page which will rerender the Gridview with the right page
      setPage(event.selected + 1)
  
    };

  return (
      <main className="dash">
        <div className="SidePanel">
            <button className={buttonStyle}>Users</button>
            <Link className={buttonStyle} to="addGame"><button>Add Game</button></Link>
            <button className={buttonStyle}>Reviews</button>
        </div>
        <div className="flex flex-col justify-center items-center h-auto w-10/12">
        <div>
          <form onSubmit={HandleSubmit} className="searchContainer">
            <input name="search" className="searchBar" type="text" placeholder="Search"></input>
            <button className="searchBtn">➜</button>
          </form>
        </div>
          <Users page={page} searchTerm={searchTerm} perPage={perPage}/>
          <ReactPaginate
            breakLabel="..."
            nextLabel="➜"
            onPageChange={handlePageClick}
            pageRangeDisplayed={0}
            marginPagesDisplayed={3}
            pageCount={Math.ceil(totalUsers / perPage)}
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
      </main>
  );


  function HandleSubmit(event){
    event.preventDefault();
    setSearchTerm(event.target.search.value);
  }
}



export default Dashboard;
