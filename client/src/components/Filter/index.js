import React from "react";
import "./filter.css"
import { platforms } from "./platforms";

function Filter({ setSearchTerm, setSearchPlatform }) {

  //State to keep track of which platforms have been checked
  const [checkedState, setCheckedState] = React.useState(
    new Array(platforms.length).fill(false)
  );

  //State to hold all the names of the platforms
  const [allPlatforms, setPlatforms] = React.useState();

  //Function to handle the submit button
  function HandleSubmit(event) {
    event.preventDefault();

    //New array to hold the names of all the platform chosen
    let chosenPlatforms = [];

    //Set the setSearchTerm prop to the search value
    setSearchTerm(event.target.search.value);

    //Set the setSearchPlatform prop to hold the array of all the platform names
    if (allPlatforms) {
      allPlatforms.map((platform, index) => platform === true ? chosenPlatforms.push(platforms[index].name) : "");
    }
    setSearchPlatform(chosenPlatforms);
  }

  //Function to handle the checkbox clicks
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    //Update the checkedState array with the boolean values
    setCheckedState(updatedCheckedState);

    const platformCheck = updatedCheckedState.map(
      (chosenPlatforms, currentState, index) => {
        if (currentState === true) {
          return chosenPlatforms + " " + platforms[index].name;
        }
        return chosenPlatforms;
      }
    );
    //Update the allPlatform array with the platform names
    setPlatforms(platformCheck);
  }

  return (
    <div className="Filter">
      <form onSubmit={HandleSubmit} className="searchContainer">
        <input name="search" className="searchBar" type="text" placeholder="Search"></input>
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
                  onChange={() => handleOnChange(index)}
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