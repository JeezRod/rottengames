import React from "react";
import './App.css';
import Navbar from "./components/Navbar";

function App() {

  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
      <div className="App">
          <Navbar ></Navbar>
      </div>
  );
}

export default App;
