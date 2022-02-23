import React from "react";
import "./Dashboard.css"
import Users from "../AllUsers";

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
          <Users/>
        </div>
      </main>
  );
}

export default Dashboard;
