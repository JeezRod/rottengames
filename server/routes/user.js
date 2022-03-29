import express from "express";
import User from "../Models/user.js";
import Game from "../Models/Game.js";

const userRouter = express.Router();
userRouter.use(express.json());

/**
 * @swagger
 * /api/users/:
 *  get:
 *    summary: Retrieves all information about of the currently logged in user
 *    description: Retrieves the all information of the currently logged in user if there is a logged in user
 *    tags: 
 *      - Users
 *    responses:
 *      200:
 *        description: Object of the currently logged in user
 *        content:
 *          application/json: 
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: The user ID generated by MongoDB
 *                  example: 622b9b6922df51e968ee69b1
 *                email: 
 *                  type: string
 *                  description: Email address of the user
 *                  example: aslizeybek2010@gmail.com
 *                name:
 *                  type: string
 *                  description: Name of the user
 *                  example: Asli z
 *                bio:
 *                  type: string
 *                  description: Bio of the user
 *                  example: No bio.
 *                picture:
 *                  type: string
 *                  description: Link to the profile picture of the user
 *                  example: https://lh3.googleusercontent.com/a/AATXAJy08z2ZQAL3fN31dh3e4pMKUAczDPY2M7k3rD6D=s96-c
 *                admin:
 *                  type: boolean
 *                  description: Boolean representing if the user is an admin or not
 *                  example: true
 *      401:
 *        description: No currently logged in user
 *        content:
 *          application/json:
 *            schema:
 *              type: object 
 */
userRouter.get("/", async (req, res) => {
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

/**
 * @swagger
 * /api/users/all:
 *  parameters:
 *    - in: query 
 *      name: page
 *      type: integer
 *      description: Page number (offset)
 *    - in: query
 *      name: size
 *      type: integer
 *      description: Number of users per page
 *    - in: query
 *      name: name
 *      type: string
 *      description: Name for filtering
 *  get:
 *    summary: Retrieves all users according to the page number and number per page
 *    description: Retrieves all users with the right number and the right number to skip for pagination
 *    tags: 
 *      - Users
 *    responses:
 *      200:
 *        description: Array of all users according to the page and number of user per page
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              items: 
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: The user ID generated by MongoDB
 *                    example: 622b9b6922df51e968ee69b1
 *                  email: 
 *                    type: string
 *                    description: Email address of the user
 *                    example: aslizeybek2010@gmail.com
 *                  name:
 *                    type: string
 *                    description: Name of the user
 *                    example: Asli z
 *                  bio:
 *                    type: string
 *                    description: Bio of the user
 *                    example: No bio.
 *                  picture:
 *                    type: string
 *                    description: Link to the profile picture of the user
 *                    example: https://lh3.googleusercontent.com/a/AATXAJy08z2ZQAL3fN31dh3e4pMKUAczDPY2M7k3rD6D=s96-c
 *                  admin:
 *                    type: boolean
 *                    description: Boolean representing if the user is an admin or not
 *                    example: true
 */
userRouter.get("/all", async (req, res) => {
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

/**
 * @swagger
 * /api/users/count:
 *  parameters:
 *    - in: query
 *      name: name
 *      type: string
 *      description: Name for filtering
 *  get:
 *    summary: Retrieves the number of users depending on a filter
 *    description: Retrieves the number of users depdending on the filter for the pagination
 *    tags: 
 *      - Users
 *    responses:
 *      200:
 *        description: Number of users depending on the filter
 *        content:
 *          application/json: 
 *            schema:
 *              type: integer
 *              description: Number of users depending on the fitter
 *              example: 4
 *            
 */
userRouter.get("/count", async (req, res) => {
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

/**
 * @swagger
 * /api/users/{userId}:
 *  parameters:
 *    - in: path
 *      name: userId
 *      type: string
 *      description: User ID of the user
 *  get:
 *    summary: Retrives a specific user
 *    description: Retrives a specific user that matches the specific user
 *    tags: 
 *      - Users
 *    responses:
 *      200:
 *        description: A specific user
 *        content:
 *          application/json: 
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: The user ID generated by MongoDB
 *                  example: 622b9b6922df51e968ee69b1
 *                email: 
 *                  type: string
 *                  description: Email address of the user
 *                  example: aslizeybek2010@gmail.com
 *                name:
 *                  type: string
 *                  description: Name of the user
 *                  example: Asli z
 *                bio:
 *                  type: string
 *                  description: Bio of the user
 *                  example: No bio.
 *                picture:
 *                  type: string
 *                  description: Link to the profile picture of the user
 *                  example: https://lh3.googleusercontent.com/a/AATXAJy08z2ZQAL3fN31dh3e4pMKUAczDPY2M7k3rD6D=s96-c
 *                admin:
 *                  type: boolean
 *                  description: Boolean representing if the user is an admin or not
 *                  example: true
 *      401:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object 
 */
userRouter.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    res.status(200)
    res.json(user);
  } catch (e) {
    res.status(401);
    res.json({});
  }
})

/**
 * @swagger
 * /api/users/{userId}/reviews:
 *  parameters:
 *    - in: path
 *      name: userId
 *      type: string
 *      description: userId for filtering
 *  get:
 *    summary: Retrives all reviews for specific user along with the respective name
 *    description: Retrives a specific user that matches the specific user
 *    tags: 
 *      - Users
 *    responses:
 *      200:
 *        description: A specific user
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              items: 
 *                type: object
 *                properties:
 *                  reviews: 
 *                    type: array
 *                    items: 
 *                      type: object
 *                      properties:
 *                        text: 
 *                          type: string
 *                          description: Content of the review
 *                          example: Good Game!
 *                        userId:
 *                          type: string
 *                          description: userId of the owner of the review
 *                          example: 622b9b6922df51e968ee69b1
 *                        ratingStarts:
 *                          type: integer
 *                          description: Number of stars the review gave
 *                          example: 5
 *                  _id: 
 *                    type: string
 *                    description: Id of the gmae
 *                    example: 6230be41eafdb82d33d2a04e
 *                  name:
 *                    type: string
 *                    description: Name of the game
 *                    example: Fuzion Frenzy
 *                  averageRating: 
 *                    type: integer
 *                    description: Average rating of the game
 *                    example: 5
 *                  imageurl:
 *                    type: string
 *                    description: Url to the image of the game
 *                    example: https://www.mobygames.com/images/covers/l/19329-fuzion-frenzy-xbox-front-cover.jpg
 *                  platform:
 *                    type: array
 *                    items:
 *                      type: string
 *                      description: platforms of the game
 *                      example: Xbox
 *                  description:
 *                    type: string
 *                    description: Description of the game
 *                    example: Fuzion Frenzy combines blah blah
 *                  releasedate: 
 *                    type: string
 *                    description: Release date of the game
 *                    example: November 14, 2001
 *                  
 *      401:
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object 
 */
userRouter.get("/:userId/reviews", async (req, res) => {
  try {
    const user = await Game.find({ "reviews.userId": req.params.userId });
    res.json(user);
  } catch (e) {
    res.status(401)
  }
})

/**
 * @swagger
 * /api/users/{userId}:
 *  parameters:
 *    - in: path
 *      name: userId
 *      type: string
 *      description: User ID of the user
 *  put:
 *    summary: Updates a user name bio or admin
 *    tags: 
 *      - Users
 *    requestBody:
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              bio:
 *                type: string
 *              admin:
 *                type: boolean
 *            example:
 *              name: Asli
 *              bio: No bio!
 */
userRouter.put("/:userId", async (req, res)=>{
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

/**
 * @swagger
 * /api/users/{userId}:
 *  parameters:
 *    - in: path
 *      name: userId
 *      type: string
 *      description: User ID of the user
 *  delete:
 *    summary: Deletes a specified user
 *    tags: 
 *      - Users
 *    requestBody:
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *            example:
 *                userId: 622b9b6922df51e968ee69b1
 */
userRouter.delete("/:userId", async (req, res) => {
  await User.deleteOne({ _id: req.params.userId })
  res.end("user deleted")
});

export default userRouter