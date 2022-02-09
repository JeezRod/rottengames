const express = require("express");
const path = require("path");
const app = express();
const api = require("./routes/api")
const dotenv = require('dotenv');
const users = new Array()
const session = require("express-session");

dotenv.config();
app.use(session({secret: 'shhhhhhh'})); 
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// anything in the URL path /api uses the Router
app.use("/api", api);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use(express.json());

app.delete("/api/v1/auth/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
    message: "Logged out successfully"
    })
})
    

module.exports = app;
