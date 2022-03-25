import React from 'react'
import ReviewCard from "../ReviewCard";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom"
import {useUser} from "../../UserContext"

const UserProfile = () => {
    const params = useParams();
    //State for the user
    const [user, setUser] = React.useState({});
    //State for the user
    const currentUser = useUser();
    //State for if currentUser is the owner of the profile page
    const [isSameUser, setIsSameUser] = React.useState(false);

    //State to hold all reviews for spefific user
    const [userReviews, setUserReviews] = React.useState({});
    //State for loading
    const [loading, setLoading] = React.useState(true)

    //State for editing mode
    const [isEdit, setIsEdit] = React.useState(false)

    //Loading the user from the url params
    React.useEffect( () => {
        async function fetchUser(){
            setLoading(true)
            let response = await fetch('/api/user/'+params.id);
            if (response.status === 200) {
                let userJson = await response.json();
                await setUser(userJson);
                if(userJson._id === currentUser.id){
                    setIsSameUser(true);
                }
            }
        }
        fetchUser();
        setLoading(false)
    },[params.id, user.email, currentUser.id, isSameUser]);

    React.useEffect(() => {
        async function fetchComments(){
            let response = await fetch('/api/user/'+user._id+"/comments");
            if (response.status === 200) {
            let gamesJson = await response.json();
            
            let userReviewsArray = []
            //Loops through all games
            gamesJson.forEach(game => {
                //Loops through all reviews
                game.reviews.forEach(review => {
                    //If the review is written by the user (same email)
                    if (review.userId === user._id){
                        let userReview = {}
                        userReviewsArray[game.name] = {id: game._id, review: review}
                        //Check if the userReview is empty before pushing to array 
                        if(Object.keys(userReview).length !== 0)
                            userReviewsArray.push(userReview);
                    }
                })
            })

            await setUserReviews(userReviewsArray)

            } else {
                console.log("no user");
            }
        }
        fetchComments();
    },[user._id])

    const handleClick = (e) =>{
        e.preventDefault();
        if(isEdit){
            setIsEdit(false);
        }else{
            setIsEdit(true);
        }
    }

     async function handleSave (e){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: e.target.name.value,
                bio: e.target.bio.value,
                handle: "profile" })
        };
        await fetch("/api/user/" + user._id, requestOptions)
        window.alert(requestOptions);
        setIsEdit(false)
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setIsEdit(false)
    }
    //If the profile is loading show loading prompt
    if (loading) {
        return (
        <div className='loading'>
            <ReactLoading type={"spin"} color="#000" />
        </div>
        )
    }
    return (
        <div className='profile flex flex-col lg:flex-row px-5 md:px-10 lg:px-20 py-32'>
            
            <aside className='user lg:w-3/12'>
                <form onSubmit={handleSave} className="items-center lg:items-start text-center lg:text-left" >
                    {isSameUser 
                    ? <p className="text-3xl font-bold dark:text-white">My Profile</p>
                    : <p className="text-3xl font-bold w-50 dark:text-white">{user.name}'s Profile</p>}
                    
                    <img className='profilePicture mx-auto my-4 lg:mx-0 lg:mt-8 rounded-full w-36 h-36' src={user.picture} alt="profile"></img>
                    
                    <div className='userSection my-8 lg:mt-16'>
                        {isEdit
                        ?<textarea className='nameText w-96 h-8 resize-none text-3xl font-bold border-2' name="name" defaultValue={user.name}></textarea>
                        :<p className="text-3xl font-bold dark:text-white w-96 mx-auto xl:mx-0">{user.name}</p>
                        }
                       
                       <p className="text-xl dark:text-white">{user.email}</p>
                    </div>
                    <div className='userSection my-8 lg:mt-16 dark:text-white'>
                    <p className="text-3xl font-bold">Bio</p>
                        {isEdit
                        ?<textarea className='bioText text-xl w-96 h-8 resize-none border-2' name="bio" defaultValue={user.bio}></textarea>
                        :<p className="text-xl w-96 xl:mx-0 mx-auto">{user.bio}</p>
                        }
                        
                    </div>
                    {isSameUser
                    ? isEdit 
                        ?<div className='userSection my-8 lg:mt-16'><button>Save</button><button onClick={handleCancel}>Cancel</button></div>
                        : <div className='userSection my-8 lg:mt-16'><button onClick={handleClick}>Edit Profile</button> </div>
                    :<></>
                    }
                </form>
            </aside>

            <main className='mainProfile w-full lg:w-9/12 flex flex-col items-start'>
                <p className="text-3xl my-6 lg:mt-0 lg:mb-6 font-bold dark:text-white">All Reviews</p>
                {Object.keys(userReviews).map( (key) => {
                    return(
                        <div className="reviewRow w-full my-6lg:mt-12 dark:text-white" key={key}>
                            <Link className="link"to={"/games/"+userReviews[key].id}>
                                <p className="text-2xl font-bold dark:text-white">{key}</p>
                            </Link>
                            <ReviewCard gameId={userReviews[key].id} review={userReviews[key].review} isAdmin={currentUser.admin || isSameUser} loggedIn={Object.keys(currentUser).length !== 0}/>
                            
                        </div>
                    )
                })}
            </main>
        </div>
    )
}

export default UserProfile