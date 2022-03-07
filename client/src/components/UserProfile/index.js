import React from 'react'
import "./userProfile.css"
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";

const UserProfile = () => {
    const params = useParams();
    //State for the user
    const [user, setUser] = React.useState({});
    //State for loading
    const [loading, setLoading] = React.useState(true)

    //Loading the user from the url params
    React.useEffect(() => {
        async function fetchUser(){
            setLoading(true)
            let response = await fetch('/api/user/'+params.id);
            if (response.status === 200) {
            let userJson = await response.json();
                console.log(userJson);
                setUser(userJson);
            } else {
                console.log("no user");
            }
        }
        fetchUser();
        setLoading(false)
    },[]);

    //If the profile is loading show loading prompt
    if (loading) {
        return (
        <div className='loading'>
            <ReactLoading type={"spin"} color="#000" />
        </div>
        )
    }

    return (
        <div className='profile'>
            
            <aside className='user'>
                <h2>Your Profile</h2>
                <img className='profilePicture' src={user.picture} alt="profile"></img>
                
                <div className='userSection'>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
                <div className='userSection'>
                    <h2>Bio</h2>
                    <p>I am pro gamer</p>
                </div>
            </aside>

            <main className='mainProfile'>
                <h2>All Reviews</h2>
            </main>
        </div>
    )
}

export default UserProfile