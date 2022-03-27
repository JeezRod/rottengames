const app = express();
import express from "express";
import path from "path";
import router from "./routes/api.js";
import dotenv from "dotenv";
import session from "express-session";
import {dirname} from "path";
import {fileURLToPath} from "url";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//Swagger Docs
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Rotten Games',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

//Swagger Docs route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(session({ secret: 'shhhhhhh' }));

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// anything in the URL path /api uses the Router
app.use("/api", router);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use(express.json());

// module.exports = app;
export default app;
