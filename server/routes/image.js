import express from "express";
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import intoStream from 'into-stream';
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';

dotenv.config();

const imageRouter = express.Router();
imageRouter.use(express.json());

imageRouter.use(
    fileUpload({
      createParentPath: true,
    })
);
    

const sasToken = process.env.AZURE_SAS;
const containerName = 'gameimages';
const storageAccountName = process.env.storagereousrcename || "rottengames";
const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
);
const containerClient = blobService.getContainerClient(containerName);

imageRouter.post("/fileUpload", (req,res) => {

    //console.log("this is happening")

    //console.log(`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`)

    console.log(req.files)
    console.log(req.files.file)

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

export default imageRouter;