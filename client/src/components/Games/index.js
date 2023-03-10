import React from "react";
import GridView from "../GridView";
import Filter from "../Filter"
import ReactPaginate from 'react-paginate';

function Games() {
  //State for page number
  const [page, setPage] = React.useState(1);
  //State for the total number of games
  const [totalGames, setTotalGames] = React.useState([]);

  //State for the search term
  const [searchTerm, setSearchTerm] = React.useState('');
  //State for the selected platforms
  const [searchPlatform, setSearchPlatform] = React.useState('');

  //State for loading the local storage
  const [loadingStorage, setloadingStorage] = React.useState(true);

  const [isCollapsed, setCollapse] = React.useState(false);

  const [winSize, setWinSize] = React.useState(window.innerWidth);

  //State for the number of games per page
  const [perPage, setPerPage] = React.useState(28);

  const buttonStyle = "mx-5 mb-5 lg:m-1 lg:p-1 rounded-none w-full bg-white text-black shadow-xl h-24 mt-10px transition ease-in-out duration-300 hover:shadow-2xl dark:text-white dark:bg-gray-800";


  //Loading the state from local storoge when the page loads
  React.useEffect(() => {
    let searchInLocal = window.localStorage.getItem('searchTerm')
    let platformInLocal = window.localStorage.getItem('platforms')

    window.addEventListener("resize", () => setWinSize(window.innerWidth));

    //Check if the search terms exists before setting it, Don't set it if its null
    if(searchInLocal){
      setSearchTerm(window.localStorage.getItem('searchTerm'));
    }
    if(platformInLocal){
      setSearchPlatform(window.localStorage.getItem('platforms').split(","))
    }
    //Loading from local storage completed
    setloadingStorage(false)
  },[]);

  //Setting the search term to local storage when search term changes
  React.useEffect(() => {
    window.localStorage.setItem('searchTerm', searchTerm);
    window.localStorage.setItem('platforms', searchPlatform)
    setPage(1)
  }, [searchTerm, searchPlatform]);

  //Fetches the data when the page, search term, per page, or platform changes
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
        let data = await fetch("/api/games/count?name=" + searchTerm);
        let dataJson = await data.json();
        //Set the returned data
        await setTotalGames(dataJson);
      }
    }
    fetchData();
    //Resets the page to 1 when a new search time is entered
  }, [searchTerm, searchPlatform, page, perPage]);

  React.useEffect(()=>{
    if(winSize>=1440){
      setPerPage(28)
    }
    if(winSize>=1024 && winSize<1440){
      setPerPage(27)
    }
  },[winSize])

  //Function to set the page everytime a new page has been clicked 
  const handlePageClick = (event) => {
    //Scrolls the page back to the top when rerender the grid
    window.scrollTo(0, 0)
    //Sets the page which will rerender the Gridview with the right page
    setPage(event.selected + 1)
  };
  
  if(loadingStorage){
    return (
      <div className="Games">
      <div className="MainContainer flex">
        <Filter setSearchTerm={setSearchTerm} searchTerm={searchTerm} setSearchPlatform={setSearchPlatform} ></Filter>
      </div>
    </div>
    )
  }

  return (
    <div className="Games">
      <div className="MainContainer flex flex-col lg:flex-row">

        {winSize < 1024
        ? 
        // block lg:hidden
        <div className={`pt-7 mt-16 lg:mt-32 lg:pt-14`}>  
          <button className="w-full" onClick={()=>setCollapse(!isCollapsed)}>Filters</button>
          <div className={` ${isCollapsed ? 'block' : 'hidden'} text-center`}><Filter setSearchTerm={setSearchTerm} setSearchPlatform={setSearchPlatform}/></div>
        </div>
        : 
        // hidden lg:block
        <Filter setSearchTerm={setSearchTerm} setSearchPlatform={setSearchPlatform}/>
        }

        <div className={`GridPaginator w-full` }>
        <GridView page={page} searchTerm={searchTerm} searchPlatform={searchPlatform} perPage={perPage}></GridView>

        <ReactPaginate
          breakLabel="..."
          nextLabel="???"
          onPageChange={handlePageClick}
          pageRangeDisplayed={0}
          marginPagesDisplayed={3}
          pageCount={Math.ceil(totalGames / perPage)}
          previousLabel="???"
          renderOnZeroPageCount={null}
          forcePage={page - 1}

          containerClassName="paginator flex justify-center mb-20 lg:text-2xl mt-8 items-center"
          activeClassName="currentPage text-white bg-black rounded-3xl dark:bg-gray-600 dark:text-white"
          pageClassName="pages transition-all ease-in duration-400 p-3 lg:p-4 mr-0.5 lg:mr-1 ml-0.5 lg:ml-1 hover:text-white hover:bg-black hover:rounded-xl dark:hover:bg-gray-600 dark:hover:text-white dark:text-white"
          nextClassName="next p-3 lg:p-4 transition-all ease-in duration-400 transition-all ease-in duration-400 hover:text-white hover:bg-black hover:rounded-xl dark:hover:bg-gray-600 dark:hover:text-white dark:text-white"
          previousClassName="previous p-3 lg:p-4 -rotate-180 transition-all ease-in duration-400 hover:text-white hover:bg-black hover:rounded-xl dark:hover:bg-gray-600 dark:hover:text-white dark:text-white"
          breakLinkClassName="break dark:text-white"
        />
      </div>
        
      </div>
    </div>

  );
}

export default Games;