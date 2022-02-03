const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    res.json({message: "Hello from server!"})
});

module.exports = router;