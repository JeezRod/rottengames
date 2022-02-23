import React from "react";
import "./AllUsers.css"
import User from "../UserCard"
import ReactLoading from "react-loading";

function AllUsers() {  
    //State for users
    const [data, setUsers] = React.useState([]);
    //State for the loading state
    const [loading, setLoading] = React.useState(false);
    //State for error
    const [error, setError] = React.useState(false);

    async function fetchUsers(){
        try{
            setLoading(true);

            let usersData = await fetch(); // create all users route
            let usersJson = await usersData.json();

            await setUsers(usersJson);

            setError(false);
        }catch(e){
            setError(true);
        } finally{
            setLoading(false)
        }
    }

    return (
        <main className="allUsers">
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
        </main>
    );
  }

export default AllUsers;