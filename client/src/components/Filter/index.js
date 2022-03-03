import React from "react";
import "./filter.css"
import { platforms } from "../../utils/platforms";


function Filter({ setSearchTerm, setSearchPlatform }) {

  const [checkedState, setCheckedState] = React.useState(
    new Array(platforms.length).fill(false)
  );
  const [allPlatforms, setPlatforms] = React.useState();

  function HandleSubmit(event) {
    let plat = [];
    event.preventDefault();
    setSearchTerm(event.target.search.value);
    console.log(event.target.search.value)
    if (allPlatforms) {
      allPlatforms.map((platform, index) => platform === true ? plat.push(platforms[index].name) : "");
    }
    setSearchPlatform(plat);
  }

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const platformCheck = updatedCheckedState.map(
      (chosenPlatforms, currentState, index) => {
        if (currentState === true) {
          return chosenPlatforms + " " + platforms[index].name;
        }
        return chosenPlatforms;
      }
    );
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

  // <div>
  //         <h2 className="platformTitle">Platforms</h2>

  //         <div className="make">
  //           <h3>Sony</h3>
  //           <input type="checkbox" id="ps1" name="ps1"></input>
  //           <label htmlFor="ps1">Playstation 1</label> <br />
  //           <input type="checkbox" id="ps2" name="ps2"></input>
  //           <label htmlFor="ps2">Playstation 2</label> <br />
  //           <input type="checkbox" id="ps3" name="ps3"></input>
  //           <label htmlFor="ps3">Playstation 3</label> <br />
  //           <input type="checkbox" id="ps4" name="ps4"></input>
  //           <label htmlFor="ps4">Playstation 4</label> <br />
  //           <input type="checkbox" id="ps5" name="ps5"></input>
  //           <label htmlFor="ps5">Playstation 5</label> <br />
  //         </div>
  //         <div className="make">
  //           <h3>Microsoft</h3>
  //           <input type="checkbox" id="xbox" name="xbox"></input>
  //           <label htmlFor="xbox">Xbox</label> <br />
  //           <input type="checkbox" id="xbox360" name="xbox360"></input>
  //           <label htmlFor="xbox360">Xbox 360</label> <br />
  //           <input type="checkbox" id="xboxone" name="xboxone"></input>
  //           <label htmlFor="xboxone">Xbox One</label> <br />
  //           <input type="checkbox" id="xboxseriesxs" name="xboxseriesxs"></input>
  //           <label htmlFor="xboxseriesxs">Xbox Series X|S</label> <br />
  //         </div>

  //         <div className="make">
  //           <h3>Nintendo</h3>
  //           <input type="checkbox" id="nes" name="nes"></input>
  //           <label htmlFor="nes">NES</label> <br />
  //           <input type="checkbox" id="snes" name="snes"></input>
  //           <label htmlFor="snes">SNES</label> <br />
  //           <input type="checkbox" id="n64" name="n64"></input>
  //           <label htmlFor="n64">N64</label> <br />
  //           <input type="checkbox" id="gamecube" name="gamecube"></input>
  //           <label htmlFor="gamecube">GameCube</label> <br />
  //           <input type="checkbox" id="wii" name="wii"></input>
  //           <label htmlFor="wii">Wii</label> <br />
  //           <input type="checkbox" id="wiiu" name="wiiu"></input>
  //           <label htmlFor="wiiu">Wii U</label> <br />
  //           <input type="checkbox" id="switch" name="swithc"></input>
  //           <label htmlFor="switch">Switch</label> <br />
  //         </div>

  //         <div className="make">
  //           <h3>Other</h3>
  //           <input type="checkbox" id="pc" name="pc"></input>
  //           <label htmlFor="pc">PC</label> <br />
  //           <input type="checkbox" id="Linux" name="Linux"></input>
  //           <label htmlFor="snes">Linux</label> <br />
  //         </div>
  //       </div>