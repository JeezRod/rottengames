import express from "express";
import User from "../Models/user.js";
import Game from "../Models/Game.js";

const user = express.Router();
user.use(express.json());

//This route returns all the information of the current logged in user
// email, name, profile picture and if the user is an admin
user.get("/", async (req, res) => {
  // first check if a user is currently logged in 
  if (typeof (req.session.userId) !== "undefined") {
    //fetch the user's information from the db using it's email
    const user = await User.find({ email: req.session.userId }).findOne();
    res.status(200)
    //return the information
    res.json(user)
  }
  //if no user is currently logged in return a 401 status
  else {
    res.status(401)
  }
})

//Route to get a specific user
user.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    res.json(user);
  } catch (e) {
    res.status(401)
  }
})

//Route to get a specific user
user.get("/:userId/comments", async (req, res) => {
  console.log("comments")
  try {
    const user = await Game.find({ "reviews.userId": req.params.userId });
    res.json(user);
  } catch (e) {
    res.status(401)
  }
})



export default user