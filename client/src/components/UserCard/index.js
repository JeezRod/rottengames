import React from "react";
import "./userCard.css"

function UserCard({ user }) {
    return (
        <div className="userCard">
            <div className="userPicture">
                <img src={user.picture}></img>
            </div>
            <div className="userInfo">
                <p>
                    {user.name}
                </p>
                <p>
                    {user.email}
                </p>
                {user.admin
                    ? <p>
                        Admin
                    </p>
                    :
                    <p>
                        User
                    </p>
                }
                <p>

                </p>
            </div>
            <div className="buttons">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    );
}

export default UserCard;