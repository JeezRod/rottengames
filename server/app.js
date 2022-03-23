const app = express();
import express from "express";
import path from "path";
import router from "./routes/api.js";
import dotenv from "dotenv";
import session from "express-session";
import {dirname} from "path";
import {fileURLToPath} from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config();
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

/*app.delete("/api/v1/auth/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
    message: "Logged out successfully"
    })
})*/


// module.exports = app;
export default app;
