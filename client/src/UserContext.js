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
    const [user, setUser] = React.useState(null);

    React.useEffect( () => {
        let mounted = true;
        fetch('/api/user').then(response => {
            if (response.status === 200) {
                console.log("response 200")
                return response.json().then(data => setUser(data.email));
            }
            else {
            console.log("response 400")
            return response.json().then(setUser(null));
            }
        })
        console.log("user: "+ user)
        return () => mounted = false;
    }, [user]);

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