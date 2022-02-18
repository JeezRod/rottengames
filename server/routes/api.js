const express = require("express");
const router = express.Router();
const Game = require("../Models/Game")

router.use(express.json());

//Sample get route (/api/)
router.get("/", (req, res) => {
    res.json({message: "Work in progress!"})
});

// Here you c9an find an incomplete list of routes that we can use to access the database.
// The routes simply return a json with a message for now, we need to make database functions
// and call them here.
// Note: this list is NOT exhaustive and we need add more routes as we go

//GET Routes

//Route to get all games in the database (/api/games)
router.get("/games", async (req, res) => {
    const result = await Game.find().limit(10);
    res.json(result);
});

//Route to get a specific game in the database (/api/games/:id)
router.get("/games/:gameId", async (req, res) => {
    const result = await Game.findById(req.params.gameId);
    //we can use req.params.gameId to send the id to the db to find its information
    res.json(result)
});

//Route to get all reviews for a specific game in the database (/api/games:id/reviews)
router.get("/games/:id/reviews", (req, res) => {
    //we can use req.params.id to send the id to the db to get all reviews related to it
    res.json({message: "Getting all reviews for game with id: "+req.params.id})
});

//Route to get all reviews for a specific game in the database (/api/games:id/reviews/:id)
router.get("/games/:gameId/reviews/:reviewId", (req, res) => {
    //we can use req.params.gameId to send the id to the db to get the review with the id req.params.reviewId
    res.json({message: "Getting review with id: "+ req.params.reviewId+" for game with id: "+req.params.gameId})
});

//POST Routes

//PUT Routes

//DELETE Routes

module.exports = router;