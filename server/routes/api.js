const express = require("express");
const router = express.Router();
const session = require("express-session");

router.use(express.json());

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const users = new Array();

//Sample get route (/api/)
router.get("/", (req, res) => {
    res.json({ message: "Work in progress!" })
});

router.post("/v1/auth/google", async (req, res) => {
    const { token } = req.body    
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
    });
    const { name, email, picture } = ticket.getPayload(); 
    const user = {"name": name,"email": email,"picture": picture};
    const existsAlready = users.findIndex(element => element.email === email)
    users.push(user);
    req.session.userId = email
    console.log(req.session.userId);  
    res.status(201)
    res.json(user)
})

// Here you can find an incomplete list of routes that we can use to access the database.
// The routes simply return a json with a message for now, we need to make database functions
// and call them here.
// Note: this list is NOT exhaustive and we need add more routes as we go

//GET Routes

//Route to get all games in the database (/api/games)
router.get("/games", (req, res) => {
    res.json({ message: "Get all the games" })
});

//Route to get a specific game in the database (/api/games/:id)
router.get("/games/:gameId", (req, res) => {
    //we can use req.params.gameId to send the id to the db to find its information
    res.json({ message: "Getting information for game with id: " + req.params.gameId })
});

//Route to get all reviews for a specific game in the database (/api/games:id/reviews)
router.get("/games/:id/reviews", (req, res) => {
    //we can use req.params.id to send the id to the db to get all reviews related to it
    res.json({ message: "Getting all reviews for game with id: " + req.params.id })
});

//Route to get all reviews for a specific game in the database (/api/games:id/reviews/:id)
router.get("/games/:gameId/reviews/:reviewId", (req, res) => {
    //we can use req.params.gameId to send the id to the db to get the review with the id req.params.reviewId
    res.json({ message: "Getting review with id: " + req.params.reviewId + " for game with id: " + req.params.gameId })
});

//POST Routes

//PUT Routes

//DELETE Routes

module.exports = router;