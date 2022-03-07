import React from 'react'
import "./userProfile.css"

const UserProfile = () => {
    //State for page number
    const [user, setUser] = React.useState({});

    //Loading the state from local storoge when the page loads
    React.useEffect(() => {
        async function fetchUser(){
            let response = await fetch('/api/user');
            if (response.status === 200) {
            let userJson = await response.json();
                console.log(userJson);
                setUser(userJson);
            } else {
                console.log("no usere");
            }
        }
        fetchUser();
    },[]);

    return (
        <div className='profile'>
            <h1>Profile</h1>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user._id}</p>
            <p>{user.picture}</p>
        </div>
    )
}

export default UserProfile