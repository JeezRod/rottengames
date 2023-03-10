import express from "express";
import Game from "../Models/Game.js";
import { getAll } from "../utils/gameutils.js"
import { getCount } from "../utils/gameutils.js"

const gameRouter = express.Router();
gameRouter.use(express.json());

/**
 * @swagger
 * /api/games:
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
 *    - in: query
 *      name: platform
 *      type: string
 *      description: All platforms that the game supports
 *  get:
 *    summary: Retrieves all games according to the page number and number per page
 *    description: Retrieves all games with the right number and the right number to skip for pagination
 *    tags: 
 *      - Games
 *    responses:
 *      200:
 *        description: Array of all games according to the page and number of user per page
 *        content:
 *          application/json: 
 *            schema:
 *              type: array
 *              items: 
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: The game ID generated by MongoDB
 *                    example: 6230be41eafdb82d33d281d9
 *                  averagerating: 
 *                    type: integer
 *                    description: Rating for a game
 *                    example: 5
 *                  description:
 *                    type: string
 *                    description: Description of the game
 *                    example: This game is about zelda
 *                  name:
 *                    type: string
 *                    description: Name of the user
 *                    example: Zelda
 *                  imageurl:
 *                    type: string
 *                    description: Link to the game cover of the user
 *                    example: https://lh3.googleusercontent.com/a/AATXAJy08z2ZQAL3fN31dh3e4pMKUAczDPY2M7k3rD6D=s96-c
 *                  platform:
 *                    type: array
 *                    items: 
 *                      type: string
 *                      description: List of platform that game has supports
 *                      example: Xbox
 *                  releasedate:
 *                    type: string
 *                    description: Release date of the game
 *                    example: 13 March 2012
 *                  reviews:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        userId: 
 *                          type: string
 *                          description: User ID of the owner of reviews
 *                          example: 622b9b6922df51e968ee69b1
 *                        text:
 *                          type: string
 *                          description: The content of the review
 *                          example: Good Game!
 *                        ratingStars:
 *                          type: integer
 *                          description: The rating of the reviews
 *                          example: 5
 */
gameRouter.get("/", async (req, res) => {
  // get the page, size, and name from query
  let { page, size, name, platform } = req.query;
  let result = await getAll(page, size, name, platform);
  res.json(result);
});


/**
 * @swagger
 * /api/games/count:
 *  parameters:
 *    - in: query
 *      name: name
 *      type: string
 *      description: Name for filtering
 *    - in: query
 *      name: platform
 *      type: string
 *      description: Platforms for filtering
 *  get:
 *    summary: Retrieves the number of games depending on a filter
 *    description: Retrieves the number of games depdending on the filter for the pagination
 *    tags: 
 *      - Games
 *    responses:
 *      200:
 *        description: Number of games depending on the filter
 *        content:
 *          application/json: 
 *            schema:
 *              type: integer
 *              description: Number of games depending on the fitter
 *              example: 4
 *            
 */
gameRouter.get("/count", async (req, res) => {
  //Get name from query
  let { name, platform } = req.query;
  let result = await getCount(name, platform);
  res.json(result);
});

/**
* @swagger
* /api/games/{gameId}:
*  parameters:
*    - in: path
*      name: gameId
*      type: string
*      description: Id of game to fetch
*  get:
*    summary: 
*    description: Retrieves all games with the right number and the right number to skip for pagination
*    tags: 
*      - Games
*    responses:
*      200:
*        description: Array of all games according to the page and number of user per page
*        content:
*          application/json: 
*            schema:
*              type: object
*              properties:
*                _id:
*                  type: string
*                  description: The game ID generated by MongoDB
*                  example: 6230be41eafdb82d33d281d9
*                averagerating: 
*                  type: integer
*                  description: Rating for a game
*                  example: 5
*                description:
*                  type: string
*                  description: Description of the game
*                  example: This game is about zelda
*                name:
*                  type: string
*                  description: Name of the user
*                  example: Zelda
*                imageurl:
*                  type: string
*                  description: Link to the game cover of the user
*                  example: https://lh3.googleusercontent.com/a/AATXAJy08z2ZQAL3fN31dh3e4pMKUAczDPY2M7k3rD6D=s96-c
*                platform:
*                  type: array
*                  items: 
*                    type: string
*                    description: List of platform that game has supports
*                    example: Xbox
*                releasedate:
*                  type: string
*                  description: Release date of the game
*                  example: 13 March 2012
*                reviews:
*                  type: array
*                  items:
*                    type: object
*                    properties:
*                      userId: 
*                        type: string
*                        description: User ID of the owner of reviews
*                        example: 622b9b6922df51e968ee69b1
*                      text:
*                        type: string
*                        description: The content of the review
*                        example: Good Game!
*                      ratingStars:
*                        type: integer
*                        description: The rating of the reviews
*                        example: 5
*/
gameRouter.get("/:gameId", async (req, res) => {
  const result = await Game.findById(req.params.gameId);
  //we can use req.params.gameId to send the id to the db to find its information
  res.json(result)
});

/**
 * @swagger
 * /api/games:
 *  post:
 *    summary: Adds a new game to the database
 *    tags: 
 *      - Games
 *    requestBody:
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            properties:
 *              rating:
 *                type: integer
 *              description:
 *                type: string
 *              name:
 *                type: string
 *              platforms:
 *                type: string
 *              date:
 *                type: string
 *              reviews:
 *                type: array
 *            example:
 *              rating: 5
 *              description: This game is about Zelda
 *              name: Zelda
 *              platform: Wii
 *              date: 2 November, 1999
 *              reviews: []
 */
gameRouter.post("/", async (req, res) => {
  // Check if the game already exists in the database 
  // const numGame = await Game.find({ /** name : req.body.name */ }).count();
  // const game = await Game.find({ /** name : game name entered on form */ })
  //if game's platform = platform given on form then res.end() or find by platform too
  // If it does not exist then add it to the db
  // if (numGame === 0) {
    const numGame = await Game.find({ name: req.body.name, platform: req.body.platform }).count();
    // If it does not exist then add it to the db
    if (numGame === 0) {
      const review = {
        userId: "123",
        text: "",
        ratingStars: 0
      }
      // Create new Game object with input from form
      let newGame = new Game({ averagerating: 0, description: req.body.description, imageurl: req.body.img, name: req.body.name, platform: req.body.platform, releasedate: req.body.date })
      newGame.save(function (err, game) {
        if (err) {
          console.error(err);
        }
  
      })
      await Game.updateOne(
        { name: req.body.name, platform: req.body.platform },
        {
          $addToSet: {
            reviews: {
              $each: [review]
            }
          }
        }
      )
      await Game.updateOne({ name: req.body.name, platform: req.body.platform },
        { "$pull": { "reviews": { "userId": "123" } } })
        res.status(200)
      res.end("success")
    }
    else {
      res.status(401)
      console.log("game already exists")
    }
    res.end("game already exists")  
})

/**
 * @swagger
 * /api/games/{gameId}/review:
 *  parameters:
 *    - in: path
 *      name: gameId
 *      type: string
 *      description: Id of game to add the review to
 *  post:
 *    summary: Adds a new review to a game in the database
 *    tags: 
 *      - Games
 *    requestBody:
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            properties:
 *              text:
 *                type: string
 *              userId:
 *                type: string
 *              ratingStars:
 *                type: integer
 *            example:
 *              text: This game is good
 *              userId: 622b9b6922df51e968ee69b1
 *              ratingStars: 5
 */
gameRouter.post("/:gameId/review", async (req, res) => {
  //First checks if the user has already commented on the review
  const result = await Game.findById(req.params.gameId);
  const isAlreadyCommented = result.reviews.userId.includes(req.body.userId)
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

/**
 * @swagger
 * /api/games/{gameId}:
 *  parameters: 
 *    - in: path
 *      name: gameId
 *      type: string
 *      description: Id of game of the review to update
 *  put:
 *    summary: Updates a game's name and description in the database
 *    tags: 
 *      - Games
 *    requestBody:
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *            example:
 *              name: Zelda
 *              description: This game is about Zelda
 */
gameRouter.put("/:gameId", async (req, res) => {
  if (req.body.handle === "gamePage") {
    await Game.updateOne({ _id: req.params.gameId },
      { $set: { "name": req.body.name, "description": req.body.description } })
    res.end("game page updated")
  }
})

/**
 * @swagger
 * /api/games/{gameId}:
 *  parameters:
 *    - in: path
 *      name: gameId
 *      type: string
 *      description: Id of game to delete
 *  delete:
 *    summary: Deletes a game from the database
 *    tags: 
 *      - Games
 *    requestBody:
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            properties:
 *              gameId:
 *                type: string
 *            example:
 *              gameId: 6230be41eafdb82d33d281d9
 */
gameRouter.delete("/:gameId", async (req, res) => {
  await Game.deleteOne({ _id: req.params.gameId })
  res.end("game deleted")
})

/**
 * @swagger
 * /api/games/{gameId}/{userId}:
 *  parameters:
 *    - in: path
 *      name: gameId
 *      type: string
 *      description: Id of game to delete
 *    - in: path
 *      name: userId
 *      type: string
 *      description: Id of the user to to delete the comment
 *  delete:
 *    summary: Deletes a spefific review of a game from the database
 *    tags: 
 *      - Games
 *    requestBody:
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            properties:
 *              gameId:
 *                type: string
 *              userId:
 *                type: string
 *            example:
 *              gameId: 6230be41eafdb82d33d281d9
 *              userId: 622b9b6922df51e968ee69b1
 */
gameRouter.delete("/:gameId/:userId", async (req, res) => {
  //Query to delete a specific review for a specific game
  await Game.updateMany(
    { "_id": req.params.gameId },
    { "$pull": { "reviews": { "userId": req.params.userId } } },
    { "multi": true }
  );

  res.end("Review deleted")
});

export default gameRouter