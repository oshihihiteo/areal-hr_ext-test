const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});
router.get("/me", (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json(null);
    }
});


module.exports = router;