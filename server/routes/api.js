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
    // get the page, size, and name from query
    let {page, size, name} = req.query;

    //Set default value for page
    if(!page){
        page = 1;
    }
    //Set default value for games per page
    if(!size){
        size = 32;
    }
    //Set default value for name
    if(!name){
        name = "";
    }

    //Computes the number to skip (page number)
    const limit = parseInt(size);
    const skip = (page - 1) * size;

    //Get all games that match the filter
    const result = await Game.find({
        name:{'$regex' : name, 
        '$options' : 'i'
        }
    })
    .limit(limit)
    .skip(skip);

    res.json(result);
});

//Route to get all games in the database (/api/games)
router.get("/games/count", async (req, res) => {
    //Get name from query
    let {name} = req.query;
    
    //Set default value for name
    if (!name){
        name = "";
    }

    //Gets the count of a filtered name
    const result = await Game.find({
        name:{'$regex' : name, 
        '$options' : 'i'
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


//POST Routes
//This inserts an empty object for some reason
router.post("/games/:gameId", async (req, res) =>{
    //Getting the email, rating, text, and name from the query
    let {email, rating, text, name} = req.query;
    //Creating the review object
    let reviewObj = {email: email, rating: rating, text:text}
    //Adding the review object to the reviews array in the database(if same object, does nothing)
    await Game.updateOne(
        {_id: req.params.gameId},
        { $addToSet: {
            reviews: {
                $each: [reviewObj]
            }
        }}
    )
    res.end("success")
});

//PUT Routes

//DELETE Routes

module.exports = router;