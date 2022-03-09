import React from "react";
//import "./filter.css"
import { platforms } from "./platforms";

function Filter({ setSearchTerm, setSearchPlatform }) {
  //State for the value of the input, initial value same as the local storage
  const [inputValue, setInputValue] = React.useState(window.localStorage.getItem('searchTerm'))
  
  //Timer to send a request only when the user stops typing
  const [timer, setTimer] = React.useState(null)

  //State to keep track of which platforms have been checked
  const [checkedState, setCheckedState] = React.useState(
    new Array(platforms.length).fill(false)
  );

  let platformFromLocal = window.localStorage.getItem('platforms')
  //State to hold all the names of the platforms, initial value same as the local storage
  if(!platformFromLocal){
    platformFromLocal = []
  } else{
    platformFromLocal.split(",")
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

    //If the allPlatforms includes the checkbox currently clicked
    if (allPlatforms.includes(name)){
      //Remove the item from allPlatforms
      allPlatforms.splice(allPlatforms.indexOf(name), 1)
    }else {
      //else add to allPlatforms
      allPlatforms.push(name)
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
      <form onSubmit={HandleSubmit} className="searchContainer flex w-full justify-between">
        <input name="search" className="searchBar h-12 w-80 sticky" type="text" placeholder="Search" value={inputValue} onChange={handleChangeSearchBox}></input>
        <button className="searchBtn text-black bg-white p-4 duration-75 transition ease-in hover:ml-1 hover:text-white hover:bg-black hover:rounded hover:cursor-pointer">➜</button>
      </form>

      <ul className="flex flex-col">
        <h1 className="mt-5 ml-7 mr-7 text-4xl">Platforms</h1>
        {platforms.map(({ name }, index) => {
          return (
            <li key={index}>
              <div className="text-2xl pt-4">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  className="w-5 h-5 mr-1"
                  name={name}
                  value={name}
                  checked={checkedState[index]}
                  onChange={() => handleChangeCheckBox(index, name)}
                />
                <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Filter;