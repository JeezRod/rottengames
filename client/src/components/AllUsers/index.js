import React from "react";
import "./AllUsers.css"
import UserCard from "../UserCard"
import ReactLoading from "react-loading";

function AllUsers({page, searchTerm, perPage}) {  
    //State for users
    const [data, setUsers] = React.useState([]);
    //State for the loading state
    const [loading, setLoading] = React.useState(false);
    //State for error
    const [error, setError] = React.useState(false);

    React.useEffect(()=>{
        //Async function to fetch count of all games
        async function fetchUsers(){
            try{
                setLoading(true);
    
                let usersData = await fetch("/api/users?page=" + page + "&name=" + searchTerm + "&size=" + perPage);
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
    },[page, searchTerm, perPage]);

    if (loading) {
        return (
          <div className='loading'>
            <ReactLoading type={"spin"} color="#000" />
          </div>
        )
      }
    
    if (error) {
        return (
          <div className='griderror'>
            <p>An error has occured</p>
          </div>
        )
    }

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