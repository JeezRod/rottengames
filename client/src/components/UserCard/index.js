import React from "react";

function UserCard({ user }) {
    const [edit, setEdit] = React.useState(false);
    const [choiceBox, setChoice] = React.useState(user.admin)
    return (
        <div className="userCard flex flex-col justify-evenly w-full h-full p-4 mt-2.5 rounded-xl shadow-xl duration-300 hover:shadow-2xl dark:hover:shadow-white dark:shadow-white">
            <div className="userPicture flex justify-center items-center">
                <img className="w-24 h-24 rounded-full dark:text-white" src={user.picture} alt="profile-pic"></img>
            </div>
            <div className="userInfo flex flex-col justify-center">
                <p className="text-center w-full overflow-auto dark:text-white">
                    {user.name}
                </p>
                <p className="text-center w-full overflow-auto dark:text-white">
                    {user.email}
                </p>

                {user.admin
                    ? <select name="usertype" id="usert" defaultValue={true} disabled={!edit} onChange={handleUserType}>
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
                ? <div className="buttons flex flex-row items-center justify-center">
                    <button className="m-1 rounded-xl duration-200 w-20 hover:bg-white hover:text-black hover:shadow-2xl dark:bg-white dark:text-black dark:hover:bg-gray-600 dark:hover:text-white dark:text-white" onClick={handleEdit}>Edit</button>
                    <form onSubmit={handleDelete}>
                        <button className="m-1 rounded-xl duration-200 w-20 hover:bg-white hover:text-black hover:shadow-2xl dark:bg-white dark:text-black dark:hover:bg-gray-600 dark:hover:text-white dark:text-white">Delete</button>
                    </form>
                </div>
                :
                <div className="buttons flex flex-row items-center justify-center">
                    <form onSubmit={handleSave} >
                        <button className="m-1 h-10 rounded-xl duration-200 w-20 hover:bg-white hover:text-black hover:shadow-2xl dark:bg-white dark:text-black dark:hover:bg-gray-600 dark:hover:text-white dark:text-white">Save</button>
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
        await fetch("/api/users/update/" + user._id, requestOptions)
        window.alert(requestOptions);
        setEdit(false)
    }

    async function handleDelete() {
        const confirmation = window.confirm("Are you sure you want to delete the user: " + user.name);
        if (confirmation) {
            await fetch("/api/users/delete/" + user._id, { method: 'DELETE' })
            window.alert("User deleted")
        }
    }
}

export default UserCard;