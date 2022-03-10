import React from 'react'
import "./userProfile.css"
import ReviewCard from "../ReviewCard";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom"
import {useUser, useUserUpdateContext} from "../../UserContext"

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
            let response = await fetch('/api/user/'+user.email+"/comments");
            if (response.status === 200) {
            let gamesJson = await response.json();
            
            let userReviewsArray = []
            //Loops through all games
            gamesJson.forEach(game => {
                //Loops through all reviews
                game.reviews.forEach(review => {
                    //If the review is written by the user (same email)
                    if (review.email === user.email){
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
    },[user.email])

    const handleClick = (e) =>{
        e.preventDefault();
        if(isEdit){
            setIsEdit(false);
        }else{
            setIsEdit(true);
        }
    }

    const handleSave = (e) =>{
        e.preventDefault();
        setIsEdit(false)
        console.log("hello")
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
        <div className='profile'>
            
            <aside className='user'>
                <form>
                    {isSameUser 
                    ? <h2>Your Profile</h2>
                    : <h2>{user.name}' Profile</h2>}
                    
                    <img className='profilePicture' src={user.picture} alt="profile"></img>
                    
                    <div className='userSection'>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                    <div className='userSection'>
                        <h2>Bio</h2>
                        {isEdit
                        ?<textarea></textarea>
                        :<p>No Bio</p>
                        }
                        
                    </div>
                    {isSameUser
                    ? isEdit 
                        ?<div className='userSection'><button onClick={handleSave}>Save</button></div>
                        :<div className='userSection'><button onClick={handleClick}>Edit Profile</button></div>
                    :<></>
                    }
                </form>
            </aside>

            <main className='mainProfile'>
                <h2>All Reviews</h2>
                {Object.keys(userReviews).map( (key) => {
                    return(
                        <div className="reviewRow" key={key}>
                            <h2>{key}</h2>
                            <Link className="link"to={"/games/"+userReviews[key].id}>
                                <ReviewCard review={userReviews[key].review} isAdmin={currentUser.admin || isSameUser} loggedIn={Object.keys(currentUser).length !== 0}/>
                            </Link>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}

export default UserProfile