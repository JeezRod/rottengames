import React from "react";
import "./userCard.css"

function UserCard({ user }) {
    const [edit, setEdit] = React.useState(false);
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
                    ?<select name="usertype" id="usert" disabled={!edit}>
                    <option value="admin" selected>Admin</option>
                    <option value="user">User</option>
                </select>
                    :
                    <select name="usertype" id="usert" disabled={!edit}>
                    <option value="admin" selected>Admin</option>
                    <option value="user" selected>User</option>
                </select>
                }
            </div>

            {!edit
                ? <div className="buttons">
                    <button onClick={handleEdit}>Edit</button>
                    <form onSubmit={handleDelete}>
                        <button>Delete</button>
                    </form>
                </div>
                :
                <div className="buttons">
                <form onSubmit={handleSubmit} >
                    <button>Save</button>
                </form>
                </div>
            } 

        </div>
    );

    function handleEdit(){
        setEdit(true)
        
    }

    function handleSubmit(event){
        event.preventDefault();
        setEdit(false)
    }

    async function handleDelete(){
        const confirmation = window.confirm("Are you sure you want to delete the user: " + user.name);
        if(confirmation){
            await fetch("/api/users/delete/"+user._id, { method: 'DELETE' })
            window.alert("User deleted")
        }
    }
}

export default UserCard;