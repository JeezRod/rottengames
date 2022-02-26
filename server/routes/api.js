const express = require("express");
const router = express.Router();
const session = require("express-session");

router.use(express.json());
const Game = require("../Models/Game")
const User = require("../Models/user")

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

//Sample get route (/api/)
router.get("/", (req, res) => {
  res.json({ message: "Work in progress!" })
});

// This route is called when the google login button is clicked
router.post("/v1/auth/google", async (req, res) => {
  const { token } = req.body
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
  });
  // Gets the user information of google account
  const { name, email, picture } = ticket.getPayload();

  // Create user object
  const user = { "name": name, "email": email, "picture": picture };

  // Set the session to the user email
  req.session.userId = user.email
  
  // Check if the user already exists in the database 
  const numUser = await User.find({ email: user.email }).count();
  // If it does not exist then add it to the db
  if (numUser === 0) {
    let new_user = new User({ email: user.email, name: user.name, picture: user.picture , admin: false});
    new_user.save(function (err, user) {
      if (err) {return console.error(err);}
      console.log(user.email + " saved to users collection.");
    });
  }
  // If it does then do not add it
  else {
    console.log("user already exists");
  }
  res.status(201)
  res.json(user)
})

// This route is called when the google logout button is clicked
router.delete("/v1/auth/logout", async (req, res) => {
  //destroy the session of the user
  await req.session.destroy()
  res.status(200)
  res.json({
    message: "Logged out successfully"
  })
})

//This route returns all the information of the current logged in user
// email, name, profile picture and if the user is an admin
router.get("/user", async (req, res) => {
  // first check if a user is currently logged in 
  if(req.session.userId){
    //fetch the user's information from the db using it's email
    const user = await User.find({ email: req.session.userId }).findOne();
    res.status(200)
    //return the information
    res.json(user)
  }
  //if no user is currently logged in return a 401 status
  else{
    res.status(401)
  }
})

router.get("/user/pfp", async (req, res) => {
  let { email } = req.query;
  if(email === ""){
    res.status(401);
  }
  const user = await User.find({ email: email }).findOne();
  console.log(user.picture);
  res.json(user.picture);
})

// Here you can find an incomplete list of routes that we can use to access the database.
// The routes simply return a json with a message for now, we need to make database functions
// and call them here.
// Note: this list is NOT exhaustive and we need add more routes as we go

//GET Routes

//Route to get all games in the database (/api/games)
router.get("/games", async (req, res) => {
  // get the page, size, and name from query
  let { page, size, name } = req.query;

  //Set default value for page
  if (!page) {
    page = 1;
  }
  //Set default value for games per page
  if (!size) {
    size = 32;
  }
  //Set default value for name
  if (!name) {
    name = "";
  }

  //Computes the number to skip (page number)
  const limit = parseInt(size);
  const skip = (page - 1) * size;

  //Get all games that match the filter
  const result = await Game.find({
    name: {
      "$regex": name,
      "$options": "i"
    }
  })
    .limit(limit)
    .skip(skip);

  res.json(result);
});

//Route to get all games in the database (/api/games)
router.get("/games/count", async (req, res) => {
  //Get name from query
  let { name } = req.query;

  //Set default value for name
  if (!name) {
    name = "";
  }

  //Gets the count of a filtered name
  const result = await Game.find({
    name: {
      "$regex": name,
      "$options": "i"
    }
  }).count();

  res.json(result);
});

//Route to get a specific game in the database (/api/games/:id)
router.get("/games/:gameId", async (req, res) => {
  const result = await Game.findById(req.params.gameId);
  //we can use req.params.gameId to send the id to the db to find its information
  res.json(result)
});

//Route to get all reviews for a specific game in the database (/api/games:id/reviews)
router.get("/games/:id/reviews", async (req, res) => {
  const result = await Game.findById(req.params.gameId)
  //we can use req.params.id to send the id to the db to get all reviews related to it
  res.json({ message: "Getting all reviews for game with id: " + req.params.id })
});

//Route to get all reviews for a specific game in the database (/api/games:id/reviews/:id)
router.get("/games/:gameId/reviews/:reviewId", (req, res) => {
  //we can use req.params.gameId to send the id to the db to get the review with the id req.params.reviewId
  res.json({ message: "Getting review with id: " + req.params.reviewId + " for game with id: " + req.params.gameId })
});

//POST Routes
//This inserts an empty object for some reason
router.post("/games/:gameId", async (req, res) =>{

    //Adding the review object to the reviews array in the database(if same object, does nothing)
    await Game.updateOne(
        {_id: req.params.gameId},
        { $addToSet: {
            reviews: {
                $each: [req.body]
            }
        }}
    )
    res.end("success")
});

//PUT Routes

//DELETE Routes

module.exports = router;