import React from 'react'
import "./userProfile.css"
import ReviewCard from "../ReviewCard";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";

const UserProfile = () => {
    const params = useParams();
    //State for the user
    const [user, setUser] = React.useState({});
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
            } else {
                console.log("no user");
            }
        }
        fetchUser();
        setLoading(false)
    },[params.id, user.email]);

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
                        userReviewsArray[game.name] = review
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
    console.log(userReviews)
    return (
        <div className='profile'>
            
            <aside className='user'>
                <h2>Your Profile</h2>
                <img className='profilePicture' src={user.picture} alt="profile"></img>
                
                <div className='userSection'>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                </div>
                <div className='userSection'>
                    <h2>Bio</h2>
                    <p>I am pro gamer</p>
                </div>
            </aside>

            <main className='mainProfile'>
                <h2>All Reviews</h2>
                {Object.keys(userReviews).map( (key) => {
                    return(
                        <div className="reviewRow" key={key}>
                            <h2>{key}</h2>
                            <ReviewCard review={userReviews[key]} isAdmin={false} loggedIn={false}></ReviewCard>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}

export default UserProfile