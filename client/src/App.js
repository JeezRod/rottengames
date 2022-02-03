import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./components/About";
import Games from "./components/Games";
import Home from "./components/Home";

function App() {

  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Router>
      <div className="App">
          <Navbar ></Navbar>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About/>}/>
        <Route path="games" element={<Games/>}/>
      </Routes>
    </Router>  
  );
}

export default App;
