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
    
                let usersData = await fetch("/api/users");
                let usersJson = await usersData.json();
                console.log(usersJson) // create all users route

    
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
            {data.map( user =>{
                return(
                    <UserCard key={user._id} user={user}/>
                )
            })}
        </main>
    );
  }

export default AllUsers;