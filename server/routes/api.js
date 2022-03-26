const router = express.Router();

import userRouter from "./user.js"
import gameRouter from "./game.js"
import googleAuthRouter from "./googleAuth.js";

import express from "express";
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import intoStream from 'into-stream';
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';
dotenv.config();

router.use(express.json());

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

//All authentication routes redirected to googleAuth.js
router.use("/v1/auth/", googleAuthRouter)

//All user routes redirected to user.js
router.use("/users", userRouter);

//All game routes redirected to game.js
router.use("/games", gameRouter);

export default router;