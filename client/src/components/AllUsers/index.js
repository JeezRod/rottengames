import React from "react";
import "./AllUsers.css"
import UserCard from "../UserCard"
import ReactLoading from "react-loading";

function AllUsers() {  
    //State for users
    const [data, setUsers] = React.useState([]);
    //State for the loading state
    const [loading, setLoading] = React.useState(false);
    //State for error
    const [error, setError] = React.useState(false);

    React.useEffect(()=>{
        async function fetchUsers(){
            try{
                setLoading(true);
    
                let usersData = await fetch("/api/dashboard/users"); // create all users route
                let usersJson = await usersData.json();
    
                await setUsers(usersJson);
    
                setError(false);
            }catch(e){
                setError(true);
            } finally{
                setLoading(false)
            }
        }
        fetchUsers();
    },[]);



    return (    
        <main className="allUsers">
            <UserCard user={data}/>
            <UserCard user={data}/>
            <UserCard user={data}/>
            <UserCard user={data}/>
            <UserCard user={data}/>
            <UserCard user={data}/>
        </main>
    );
  }

export default AllUsers;