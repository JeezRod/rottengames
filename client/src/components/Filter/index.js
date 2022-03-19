import React from "react";
import { platforms } from "./platforms";

function Filter({ setSearchTerm, setSearchPlatform }) {
  
  //Timer to send a request only when the user stops typing
  const [timer, setTimer] = React.useState(null)

  //State to keep track of which platforms have been checked
  const [checkedState, setCheckedState] = React.useState(
    new Array(platforms.length).fill(false)
  );

  //Check if search term from local is null, if so set it to empty string
  let searchFromLocal =  window.localStorage.getItem('searchTerm');
  if(!searchFromLocal){
    searchFromLocal = "";
  } 
  //State for the value of the input, initial value same as the local storage
  const [inputValue, setInputValue] = React.useState(searchFromLocal)

  let platformFromLocal = window.localStorage.getItem('platforms')
  //State to hold all the names of the platforms, initial value same as the local storage
  if(!platformFromLocal){
    platformFromLocal = []
  } else {
    platformFromLocal = platformFromLocal.split(",");
  }
  
  const [allPlatforms] = React.useState(platformFromLocal);

  //WHen page loads check the boxes of platforms that are present in the local storage
  React.useEffect(() => {
    //Creates an arry of true or false, true when item is present in local storage
    const updatedCheckedState = platforms.map((item, index) => 
      allPlatforms.includes(item.name) ? true : false
    );
    //Update the checkedState array with the boolean values
    setCheckedState(updatedCheckedState);
  }, [allPlatforms]);

  //Function to handle the submit button
  function HandleSubmit(event) {
    event.preventDefault();
  }

  //Function to handle the checkbox clicks
  const handleChangeCheckBox = (position, name) => {
    //Creates array of true or false of which one is checked
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    //Update the checkedState array with the boolean values
    setCheckedState(updatedCheckedState);
    console.log(allPlatforms)

    //If the allPlatforms includes the checkbox currently clicked
    if (allPlatforms.includes(name)){
      //Remove the item from allPlatforms
      allPlatforms.splice(allPlatforms.indexOf(name), 1)
    }else {
      //else add to allPlatforms
      allPlatforms.push(name);
    }
    //Set searchPlatform as new array for re-render
    setSearchPlatform([...allPlatforms]);
  }

  //Function to handle the changes in the search bar
  const handleChangeSearchBox = (event) => {
    //Set the inputValue same as the value in the input box
    setInputValue(event.target.value)
    //Clear the timout
    clearTimeout(timer)

    //Only set the new search term after half a second (prompts re-render)
    const newTimer = setTimeout(() => {
      setSearchTerm(event.target.value);  
    }, 500)
    setTimer(newTimer)
  }

  return (
    <div className="Filter pt-1 mr-1 ml-1">
      <form onSubmit={HandleSubmit} className="searchContainer flex w-full justify-between pt-14">
        <input name="search" className="searchBar h-12 w-80 sticky mt-32 ml-8 text-2xl border-b-2 w-64" type="text" placeholder="Search..." value={inputValue} onChange={handleChangeSearchBox}></input>
      </form>

      <ul className="flex flex-col mx-4 lg:mx-4 xl:mx-8">
        <h1 className="platformTitle mt-9 ml-7 text-3xl lg:text-3xl xl:text-4xl dark:text-white">Platforms</h1>
        {platforms.map(({ name }, index) => {
          return (
            <li key={index}>
              <div className="platforms-list text-xl lg:text-2xl xl:text-3xl pt-6 w-64 list-none inline-block ml-7">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  className="platforms-list-item w-5 h-5 mr-1"
                  name={name}
                  value={name}
                  checked={checkedState[index]}
                  onChange={() => handleChangeCheckBox(index, name)}
                />
                <label htmlFor={`custom-checkbox-${index}`} className="dark:text-white">{name}</label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Filter;