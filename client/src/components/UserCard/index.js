import React from "react";
import "./userCard.css"

function UserCard(user){
    return(
        <div className="userCard">
            <div className="userPicture">
                <h1>image</h1>
            </div>
            <div className="userInfo">
                <h1>
                    rrodrigo132@gmail.com
                </h1>
                <h1>
                    admin: false
                </h1>
            </div>
            
        </div>
    );
}

export default UserCard;