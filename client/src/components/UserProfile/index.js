import React from 'react'
//import "./userProfile.css"
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

    //Loading the user from the url params
    React.useEffect( () => {
        async function fetchUser(){
            setLoading(true)
            let response = await fetch('/api/user/'+params.id);
            if (response.status === 200) {
                let userJson = await response.json();
                console.log(userJson);
                await setUser(userJson);
                console.log(currentUser.id)
                console.log(userJson._id)
                console.log(userJson._id === currentUser.id);
                if(userJson._id === currentUser.id){
                    setIsSameUser(true);
                    console.log(isSameUser)
                }
                console.log(isSameUser)
            } else {
                console.log("no user");
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

    //If the profile is loading show loading prompt
    if (loading) {
        return (
        <div className='loading'>
            <ReactLoading type={"spin"} color="#000" />
        </div>
        )
    }
    return (
        <div className='profile flex pl-20 pr-20'>
            
            <aside className='user mt-12 w-3/12 h-full'>
                {isSameUser 
                ? <p className="text-3xl font-bold">My Profile</p>
                : <p>{user.name}' Profile</p>}
                
                <img className='profilePicture mt-8 rounded-full w-36 h-36' src={user.picture} alt="profile"></img>
                
                <div className='userSection mt-16'>
                    <p className="text-3xl font-bold">{user.name}</p>
                    <p className="text-xl">{user.email}</p>
                </div>
                <div className='userSection mt-16'>
                    <p className="text-3xl font-bold">Bio</p>
                    <p className="text-xl">I am pro gamer</p>
                </div>
            </aside>

            <main className='mainProfile mt-12 w-9/12 flex flex-col items-start'>
                <p className="text-3xl font-bold">All Reviews</p>
                {Object.keys(userReviews).map( (key) => {
                    return(
                        <div className="reviewRow w-full mt-12" key={key}>
                            <p className="text-2xl font-bold">{key}</p>
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