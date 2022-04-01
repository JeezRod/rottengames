const router = express.Router();

import userRouter from "./user.js"
import gameRouter from "./game.js"
import imageRouter from "./image.js"
import googleAuthRouter from "./googleAuth.js";

import express from "express";

router.use(express.json());

//All authentication routes redirected to googleAuth.js
router.use("/v1/auth/", googleAuthRouter)

//All user routes redirected to user.js
router.use("/users", userRouter);

//All game routes redirected to game.js
router.use("/games", gameRouter);

//All image routes redirected to image.js
router.use("/images", imageRouter);

export default router;