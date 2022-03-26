import React, {useContext, useState} from 'react';

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useUser(){
    return useContext(UserContext);
}

export function useUserUpdateContext(){
    return useContext(UserUpdateContext);
}

export function UserProvider({children}){
    const [user, setUser] = React.useState({});

    React.useEffect( () => {
        let mounted = true;
        fetch('/api/users').then(response => {
            if (response.status === 200) {
                console.log("response 200")
                return response.json().then(data => setUser(
                    {
                        email: data.email, 
                        admin: data.admin, 
                        picture: data.picture, 
                        name: data.name,
                        id: data._id
                    }
                    ));
            }
            else {
            console.log("response 400")
            return response.json().then(setUser(null));
            }
        })
        console.log("user: "+ user.admin)
        return () => mounted = false;
    }, [user.email, user.admin]);

    function logoutUser(){
     console.log("logout user context")   
    }

    return(
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={logoutUser}>
                {children} 
            </UserUpdateContext.Provider>   
        </UserContext.Provider>
    )
}