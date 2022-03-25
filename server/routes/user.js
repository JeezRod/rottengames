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

//This route gets all the user so when administration tries to see
// them all, they can locate it. This route it is used in the dashboard
// component

user.get("/all", async (req, res) => {
  let { page, size, name } = req.query;

  //Set default value for page
  if (!page) {
    page = 1;
  }
  //Set default value for users per page
  if (!size) {
    size = 8;
  }
  //Set default value for name
  if (!name) {
    name = "";
  }

  //Computes the number to skip (page number)
  const limit = parseInt(size);
  const skip = (page - 1) * size;

  //Get all games that match the filter
  const result = await User.find({
    name: {
      "$regex": name,
      "$options": "i"
    }
  })
    .limit(limit)
    .skip(skip);

  res.json(result);
})

//Route to get all users in the database (/api/users)
user.get("/count", async (req, res) => {
  //Get name from query
  let { name } = req.query;

  //Set default value for name
  if (!name) {
    name = "";
  }

  //Gets the count of a filtered name
  const result = await User.find({
    name: {
      "$regex": name,
      "$options": "i"
    }
  }).count();

  res.json(result);
});

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

// This route updates the users admin permission
user.put("/:userId", async (req, res)=>{
  if(req.body.handle === "permissions"){
    await User.updateOne(
      {_id: req.params.userId},
       {$set: {"admin": req.body.admin}})
    res.end("permissions updated")
  }
  if(req.body.handle === "profile"){
    await User.updateOne(
      {_id: req.params.userId},
       {$set: {"name": req.body.name, "bio": req.body.bio}})
    res.end("user updated")
  }
})

export default user