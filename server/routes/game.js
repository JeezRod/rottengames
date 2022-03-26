import express from "express";
import User from "../Models/user.js";
import Game from "../Models/Game.js";

const gameRoute = express.Router();
gameRoute.use(express.json());

//Route to get all games in the database (/api/games)
gameRoute.get("/", async (req, res) => {

    // get the page, size, and name from query
    let { page, size, name, platform } = req.query;
  
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
    //Set default value for platform if none is checked
    if (!platform) {
      platform = "";
    }
  
    //Computes the number to skip (page number)
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    let result = null;
  
    if (platform === "") {
      result = await Game.find({
        name: {
          "$regex": name,
          "$options": "i"
        }
      })
        .limit(limit)
        .skip(skip);
    }
    else {
      //Gets the count of a filtered name
      result = await Game.find({
        name: {
          "$regex": name,
          "$options": "i"
        },
        platform: {
          "$in": platform
        }
      })
        .limit(limit)
        .skip(skip);
    }
    res.json(result);
  });
  
  //Route to get all games in the database (/api/games)
  gameRoute.get("/count", async (req, res) => {
    //Get name from query
    let { name, platform } = req.query;
  
    //Set default value for name
    if (!name) {
      name = "";
    }
  
    if (!platform) {
      platform = "";
    }
  
    let result = null;
  
    if (platform === "") {
      result = await Game.find({
        name: {
          "$regex": name,
          "$options": "i"
        }
      }).count();
    }
    else {
      //Gets the count of a filtered name
      result = await Game.find({
        name: {
          "$regex": name,
          "$options": "i"
        },
        platform: {
          "$in": platform
        }
      }).count();
    }
    res.json(result);
  });

  //Route to get a specific game in the database (/api/games/:id)
  gameRoute.get("/:gameId", async (req, res) => {
    const result = await Game.findById(req.params.gameId);
    //we can use req.params.gameId to send the id to the db to find its information
    res.json(result)
  });

  //Inserts a new game
  gameRoute.post("/add", async (req, res) => {
    // Check if the game already exists in the database 
    // const numGame = await Game.find({ /** name : req.body.name */ }).count();
    // const game = await Game.find({ /** name : game name entered on form */ })
    //if game's platform = platform given on form then res.end() or find by platform too
    // If it does not exist then add it to the db
    // if (numGame === 0) {
      await Game.inserteOne(
        {
          $addToSet: {
            reviews: {
              $each: [req.body]
            }
          }
        }
      )
      res.end("success")
    // }
    res.end("game already exists")
  })

  //This inserts an empty object for some reason
  gameRoute.post("/:gameId/review", async (req, res) => {
    //First checks if the user has already commented on the review
    const result = await Game.findById(req.params.gameId);
    const isAlreadyCommented = result.reviews.userId.includes(req.body.userId)
    console.log(req.body)
    //Only add the review if the user has not commented on the same game
    if (!isAlreadyCommented) {
      //Adding the review object to the reviews array in the database(if same object, does nothing)
      await Game.updateOne(
        { _id: req.params.gameId },
        {
          $addToSet: {
            reviews: {
              $each: [req.body]
            }
          }
        }
      )
      res.end("success")
    }
  
    res.end("review already exists")
  });

export default gameRoute