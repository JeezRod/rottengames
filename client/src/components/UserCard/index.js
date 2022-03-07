import React from "react";
import "./userCard.css"

function UserCard({ user }) {
    const [edit, setEdit] = React.useState(false);
    const [choiceBox, setChoice] = React.useState(user.admin)
    return (
        <div className="userCard">
            <div className="userPicture">
                <img src={user.picture} alt="profile-pic"></img>
            </div>
            <div className="userInfo">
                <p>
                    {user.name}
                </p>
                <p>
                    {user.email}
                </p>

                {user.admin
                    ?<select name="usertype" id="usert" defaultValue={true} disabled={!edit} onChange={handleUserType}>
                    <option value={true}>Admin</option>
                    <option value={false}>User</option>
                    </select>
                    :
                    <select name="usertype" id="usert" defaultValue={false} disabled={!edit} onChange={handleUserType}>
                    <option value={true}>Admin</option>
                    <option value={false}>User</option>
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
                <form onSubmit={handleSave} >
                    <button>Save</button>
                </form>
                </div>
            } 

        </div>
    );

    function handleEdit(){
        setEdit(true)     
    }

    function handleUserType(event){
        setChoice(event.target.value);
    }

    async function handleSave(event){
        window.alert("Settings saved")
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ admin: choiceBox })
        };
        await fetch("api/users/update/" + user._id, requestOptions)
        window.alert(requestOptions);
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