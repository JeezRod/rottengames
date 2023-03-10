import React from "react";
import { Link } from "react-router-dom"
import Translate from 'react-translate-component';
import placeHolderImage from "../../assets/light_grey_square.png"

function UserCard({ user }) {
    const [edit, setEdit] = React.useState(false);
    const [choiceBox, setChoice] = React.useState(user.admin)

    //Sets a placeholder image when it is unable to get the profile picture from google
    function setPlaceHolder(e){
        e.target.src = placeHolderImage
    }

    return (
        <div className="userCard flex flex-col justify-evenly w-full h-full p-4 rounded-xl shadow-xl duration-300 hover:shadow-2xl dark:bg-gray-800">
            <div className="userPicture flex justify-center items-center">
                <img className="w-24 h-24 rounded-full dark:text-white" src={user.picture} alt="" onError={setPlaceHolder}></img>
            </div>
            <div className="userInfo flex flex-col justify-center">
                <Link to={"/profile/" + user._id}>
                    <p className="text-center w-full overflow-auto dark:text-white">
                        {user.name}
                    </p>
                </Link>
                <p className="text-center w-full overflow-auto dark:text-white">
                    {user.email}
                </p>

                {user.admin
                    ? <select name="usertype" id="usert" defaultValue={true} disabled={!edit} onChange={handleUserType}>
                        <Translate content="userCard.admin" component="option" value={true} />
                        <Translate content="userCard.user" component="option" value={false} />
                    </select>
                    :
                    <select name="usertype" id="usert" defaultValue={false} disabled={!edit} onChange={handleUserType}>
                        <Translate content="userCard.admin" component="option" value={true} />
                        <Translate content="userCard.user" component="option" value={false} />
                    </select>
                }
            </div>

            {!edit
                ? <div className="buttons flex flex-row items-center justify-center">
                    <Translate content="userCard.edit" component="button" className="m-1 rounded-xl duration-200 hover:shadow-2xl" onClick={handleEdit}/>
                    <form onSubmit={handleDelete}>
                        <Translate content="userCard.delete" component="button" className="m-1 rounded-xl duration-200 hover:shadow-2xl"/>
                    </form>
                </div>
                :
                <div className="buttons flex flex-row items-center justify-center">
                    <form onSubmit={handleSave} >
                    <Translate content="userCard.save" component="button" className="m-1 h-10 rounded-xl duration-200 hover:bg-white hover:text-black hover:shadow-2xl"/>
                    </form>
                </div>
            }

        </div>
    );

    function handleEdit() {
        setEdit(true)
    }

    function handleUserType(event) {
        setChoice(event.target.value);
    }

    async function handleSave(event) {
        window.alert("Settings saved")
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ admin: choiceBox, handle: "permissions" })
        };
        await fetch("/api/users/" + user._id, requestOptions)
        window.alert(requestOptions);
        setEdit(false)
    }

    async function handleDelete() {
        const confirmation = window.confirm("Are you sure you want to delete the user: " + user.name);
        if (confirmation) {
            await fetch("/api/users/" + user._id, { method: 'DELETE' })
            window.alert("User deleted")
        }
    }
}

export default UserCard;