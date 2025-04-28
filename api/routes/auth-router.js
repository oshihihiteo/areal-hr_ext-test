const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/user-controller");
const passport = require("passport");

router.post("/", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

module.exports = router;