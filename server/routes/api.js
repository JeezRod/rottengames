const router = express.Router();

import user from "./user.js"
import gameRoute from "./game.js"

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

router.use("/games", gameRoute);

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