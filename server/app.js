const express = require("express");
const path = require("path");
const app = express();
const api = require("./routes/api")

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// anything in the URL path /api uses the Router
app.use("/api", api);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


module.exports = app;
