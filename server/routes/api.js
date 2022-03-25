const router = express.Router();

import user from "./user.js"

import session from "express-session";
import express from "express";
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import intoStream from 'into-stream';
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';
dotenv.config();

router.use(express.json());
import Game from "../Models/Game.js";
import User from "../Models/user.js";

import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const sasToken = process.env.AZURE_SAS;
const containerName = 'helloblob';
const storageAccountName = process.env.storagereousrcename || "azuretest1741928";
const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
);
console.log( `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`);

const containerClient = blobService.getContainerClient(containerName);

router.use(
  fileUpload({
    createParentPath: true,
  })
)

router.post("/fileUpload", (req,res) => {
  console.log(JSON.stringify(req.files));

  const file = req.files.file;
  const path = file.name;

  const blobName = req.files.file.name;
  const stream = intoStream(req.files.file.data);

  const blobClient = containerClient.getBlockBlobClient(blobName);
  
  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };
  blobClient.uploadStream(stream, undefined, undefined, options)
  .then(err => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({status : "success", path: path});
  });
})

//Sample get route (/api/)
router.get("/", (req, res) => {
  res.json({ message: "Work in progress!" })
});

// This route is called when the google login button is clicked
router.post("/v1/auth/google", async (req, res) => {
  try {
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
      let new_user = new User({ email: user.email, name: user.name, picture: user.picture, admin: false });
      new_user.save(function (err, user) {
        if (err) { return console.error(err); }
        console.log(user.email + " saved to users collection.");
      });
    }
    // If it does then do not add it
    else {
      console.log("user already exists");
    }
    res.status(201)
    res.json(user)
  }
  catch(e){
    console.log("cancelled login")
  }
  
})

//This route is called when the google logout button is clicked
router.delete("/v1/auth/logout", async (req, res) => {
  //destroy the session of the user
  console.log("loggin out the user here")
  await req.session.destroy();
  console.log("session: " + req.session)
})

router.use("/user", user);

// Here you can find an incomplete list of routes that we can use to access the database.
// The routes simply return a json with a message for now, we need to make database functions
// and call them here.
// Note: this list is NOT exhaustive and we need add more routes as we go

//GET Routes

//Route to get all games in the database (/api/games)
router.get("/games", async (req, res) => {

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
router.get("/games/count", async (req, res) => {
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
router.post("/games/:gameId", async (req, res) => {
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

  res.end("already exists")
});

router.post("/games/add", async (req, res) => {
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

//PUT Routes

// This route updates a game's page
router.put("/games/update/:gameId", async (req, res) => {
  if (req.body.handle === "gamePage"){
    await Game.updateOne({_id: req.params.gameId},
      {$set: {"name": req.body.name, "description": req.body.description}})
    res.end("game page updated")
    console.log("game page updated")
  }
})

//DELETE Routes

//Deletes chosen game when "delete game" button is clicked
router.delete("/games/delete/:gameId", async (req, res) => {
  await Game.deleteOne({ _id: req.params.gameId })
  // res.redirect(200, '/games');
  res.end("game deleted")
})

router.delete("/games/delete/:gameId/:userId", async (req, res) =>{
  //Query to delete a specific review for a specific game
  await Game.updateMany(
    { "_id": req.params.gameId }, 
    {"$pull": {"reviews": {"userId": req.params.userId}}},
    {"multi": true}
    );

  res.end("Review deleted")
});

// module.exports = router;
export default router;