import React from "react";
import "./filter.css"

function Filter() {
  return (
      <div className="Filter">
          <input className="searchBar" type="text" placeholder="Search" value="search"></input>

          <h2 className="platformTitle">Platforms</h2>

          <div className="make">
            <h3>Sony</h3>
            <input type="checkbox" id="ps1" name="ps1"></input>
            <label for="ps1">Playstation 1</label> <br/>
            <input type="checkbox" id="ps2" name="ps2"></input>
            <label for="ps2">Playstation 2</label> <br/>
            <input type="checkbox" id="ps3" name="ps3"></input>
            <label for="ps3">Playstation 3</label> <br/>
            <input type="checkbox" id="ps4" name="ps4"></input>
            <label for="ps4">Playstation 4</label> <br/>
            <input type="checkbox" id="ps5" name="ps5"></input>
            <label for="ps5">Playstation 5</label> <br/>
          </div>
          <div className="make">
            <h3>Microsoft</h3>
            <input type="checkbox" id="xbox" name="xbox"></input>
            <label for="xbox">Xbox</label> <br/>
            <input type="checkbox" id="xbox360" name="xbox360"></input>
            <label for="xbox360">Xbox 360</label> <br/>
            <input type="checkbox" id="xboxone" name="xboxone"></input>
            <label for="xboxone">Xbox One</label> <br/>
            <input type="checkbox" id="xboxseriesxs" name="xboxseriesxs"></input>
            <label for="xboxseriesxs">Xbox Series X|S</label> <br/>
          </div>
          
          <div className="make">
            <h3>Nintendo</h3>
            <input type="checkbox" id="nes" name="nes"></input>
            <label for="nes">NES</label> <br/>
            <input type="checkbox" id="snes" name="snes"></input>
            <label for="snes">SNES</label> <br/>
            <input type="checkbox" id="n64" name="n64"></input>
            <label for="n64">N64</label> <br/>
            <input type="checkbox" id="gamecube" name="gamecube"></input>
            <label for="gamecube">GameCube</label> <br/>
            <input type="checkbox" id="wii" name="wii"></input>
            <label for="wii">Wii</label> <br/>
            <input type="checkbox" id="wiiu" name="wiiu"></input>
            <label for="wiiu">Wii U</label> <br/>
            <input type="checkbox" id="switch" name="swithc"></input>
            <label for="switch">Switch</label> <br/>
          </div>

          <div className="make">
            <h3>Other</h3>
            <input type="checkbox" id="pc" name="pc"></input>
            <label for="pc">PC</label> <br/>
            <input type="checkbox" id="Linux" name="Linux"></input>
            <label for="snes">Linux</label> <br/>
          </div>





      </div>
  );
}

export default Filter;