const express = require("express");
const router = express.Router();
const ActionsController = require("../controllers/actions-controller");

router.get("/actions", ActionsController.getAllActions);

module.exports = router;
