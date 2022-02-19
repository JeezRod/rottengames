const express = require("express");
const router = express.Router();
router.use(express.json());
const Game = require("../Models/Game")

//Sample get route (/api/)
router.get("/", (req, res) => {
    res.json({message: "Work in progress!"})
});

// Here you can find an incomplete list of routes that we can use to access the database.
// The routes simply return a json with a message for now, we need to make database functions
// and call them here.
// Note: this list is NOT exhaustive and we need add more routes as we go

//GET Routes

//Route to get all games in the database (/api/games)
router.get("/games", async (req, res) => {
    let {page, size} = req.query;
    if(!page){
        page = 1;
    }
    if(!size){
        size = 32;
    }

    const limit = parseInt(size);
    const skip = (page - 1) * size

    const result = await Game.find().limit(limit).skip(skip);
    res.json(result);
});

//Route to get all games in the database (/api/games)
router.get("/games/count", async (req, res) => {
    const result = await Game.count();
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