const express = require("express");
const router = express.Router();
const ChangelogController = require("../controllers/changelog-controller");

router.get("/changelog", ChangelogController.getChangelog);

module.exports = router;
