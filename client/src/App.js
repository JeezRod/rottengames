import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./About";

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
        <Route path="about" element={<About/>}/>
      </Routes>
    </Router>  
  );
}

export default App;
