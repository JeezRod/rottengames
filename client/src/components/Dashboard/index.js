import React from "react";
import ReactPaginate from 'react-paginate';
import Users from "../AllUsers";
import AddGame from "../AddGame"
import {useUser} from "../../UserContext"
import Translate from 'react-translate-component';

function Dashboard() {

  const [page, setPage] = React.useState(1);

  const [totalUsers, setTotalUsers] = React.useState([]);

  const [perPage] = React.useState(8);

  const [searchTerm, setSearchTerm] = React.useState('');

  const [selectedComponent, setComponent] = React.useState("users")

  const user = useUser();

  //TailwindCSS for the buttons
  const buttonStyle = "mx-5 mb-5 lg:m-1 lg:p-1 rounded-none w-full bg-white text-black shadow-xl h-24 mt-10px transition ease-in-out duration-300 hover:shadow-2xl dark:text-white dark:bg-gray-800";

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
  if(user.admin){
  return (
      <main className="dash flex flex-col lg:flex-row h-auto items-start pt-32">
        <div className="SidePanel flex flex-row mx-auto lg:flex-col justify-center h-auto lg:w-3/12 w-10/12">
            <Translate content="dashboard.users" component="button" onClick={()=>setComponent("users")} className={buttonStyle}/>
            <Translate content="dashboard.addGame" component="button" onClick={()=>setComponent("addGame")} className={buttonStyle}/>
        </div>
        <div className="MainPanel flex flex-col justify-center items-center h-auto lg:w-10/12 m-auto">
          {selectedComponent === "users"
          ? <div>
            <form onSubmit={HandleSubmit} className="searchContainer flex flex-row justify-center items-center mb-8">
            <Translate component="input" name="search" type="text" attributes={{ placeholder: "dashboard.placeHolder" }} className="searchBar mr-4 p-2" />
              <button>???</button>
            </form>
          
            <Users page={page} searchTerm={searchTerm} perPage={perPage}/>
            <ReactPaginate
              breakLabel="..."
              nextLabel="???"
              onPageChange={handlePageClick}
              pageRangeDisplayed={0}
              marginPagesDisplayed={3}
              pageCount={Math.ceil(totalUsers / perPage)}
              previousLabel="???"
              renderOnZeroPageCount={null}

              containerClassName="paginator flex justify-center mb-20 text-2xl mt-8 items-center"
              activeClassName="currentPage text-white bg-black rounded-3xl dark:bg-gray-600 dark:text-white"
              pageClassName="pages transition-all ease-in duration-400 p-4 mr-1 ml-1 hover:text-white hover:bg-black hover:rounded-xl dark:hover:bg-gray-600 dark:hover:text-white dark:text-white"
              nextClassName="next p-4 transition-all ease-in duration-400 transition-all ease-in duration-400 hover:text-white hover:bg-black hover:rounded-xl dark:hover:bg-gray-600 dark:hover:text-white dark:text-white"
              previousClassName="previous p-4 -rotate-180 transition-all ease-in duration-400 hover:text-white hover:bg-black hover:rounded-xl dark:hover:bg-gray-600 dark:hover:text-white dark:text-white"
              breakLinkClassName="break dark:text-white"
            />
          </div>
          : <AddGame/>}
          

        </div>
      </main>
  );
  }
  return(
  <div className=" flex flex-col pt-32 dark:text-white text-center pt-80">
    <p className="text-9xl items-center font-bold">403</p>
    <p className="text-3xl font-bold">Forbidden</p>
    <p className="text-xl font-bold">Access Denied!</p>
  </div>
   
  );


  function HandleSubmit(event){
    event.preventDefault();
    setSearchTerm(event.target.search.value);
  }
}



export default Dashboard;
