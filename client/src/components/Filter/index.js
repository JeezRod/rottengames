import React from "react";
import "./filter.css"
import { platforms } from "./platforms";

function Filter({ setSearchTerm, setSearchPlatform }) {
  const [inputValue, setInputValue] = React.useState(window.localStorage.getItem('searchTerm'))
  const [timer, setTimer] = React.useState(null)

  //State to keep track of which platforms have been checked
  const [checkedState, setCheckedState] = React.useState(
    new Array(platforms.length).fill(false)
  );

  //State to hold all the names of the platforms
  const [allPlatforms] = React.useState(window.localStorage.getItem('platforms').split(","));

  React.useEffect(() => {
    console.log(allPlatforms)
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
  const handleOnChange = (position, name) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    //Update the checkedState array with the boolean values
    setCheckedState(updatedCheckedState);

    if (allPlatforms.includes(name)){
      allPlatforms.splice(allPlatforms.indexOf(name), 1)
    }else {
      allPlatforms.push(name)
    }

    setSearchPlatform([...allPlatforms]);
    console.log(allPlatforms)
  }

  function handleChange(event) {
    setInputValue(event.target.value)
    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      setSearchTerm(event.target.value);  
    }, 500)

    setTimer(newTimer)
  }

  return (
    <div className="Filter">
      <form onSubmit={HandleSubmit} className="searchContainer">
        <input name="search" className="searchBar" type="text" placeholder="Search" value={inputValue} onChange={handleChange}></input>
        <button className="searchBtn">➜</button>
      </form>

      <ul className="platforms-list">
        <h1 className="platformTitle">Platforms</h1>
        {platforms.map(({ name }, index) => {
          return (
            <li key={index}>
              <div className="platforms-list-item">
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  className="custom-checkbox"
                  name={name}
                  value={name}
                  checked={checkedState[index]}
                  onChange={() => handleOnChange(index, name)}
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