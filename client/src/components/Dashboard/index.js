import React from "react";
import "./Dashboard.css"
import Games from "../Games";

function Dashboard() {
  // State to change components
  const [comp, setComp] = React.useState();

  return (
      <main>
        <div className="SidePanel">
            <button>Users</button>
            <button>Add Game</button>
            <button>Reviews</button>
        </div>
        <div className="MainPanel">
          <h1>Dashboard</h1>
        </div>
      </main>
  );
}

export default Dashboard;
