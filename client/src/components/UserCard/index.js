import React from "react";
import "./userCard.css"

function UserCard({ user }) {
    return (
        <div className="userCard">
            <div className="userPicture">
                <img src="https://lh3.googleusercontent.com/a/AATXAJypp4eOWulLbjstSeVSukoMmtf9xz5IwfVyJ9Bn=s96-c"></img>
            </div>
            <div className="userInfo">
                <p>
                    Rodrigo Rivas
                </p>
                <p>
                    rivasal.rodrigo@gmail.com
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