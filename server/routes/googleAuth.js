import express from "express";
import User from "../Models/user.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from 'dotenv';

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
dotenv.config();
const googleAuthRouter = express.Router();
googleAuthRouter.use(express.json());

// This route is called when the google login button is clicked
googleAuthRouter.post("/google", async (req, res) => {
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
  googleAuthRouter.delete("/logout", async (req, res) => {
    //destroy the session of the user
    console.log("loggin out the user here")
    await req.session.destroy();
    console.log("session: " + req.session)
  })

export default googleAuthRouter