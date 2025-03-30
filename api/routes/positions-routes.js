const express = require("express");
const router = express.Router();
const PositionsController = require("../controllers/positions-controllers");

router.get("/positions", PositionsController.getAllPositions);
router.get("/positions/:id", PositionsController.getPositionById);
router.post("/positions", PositionsController.createPosition);
router.delete("/positions/:id", PositionsController.deletePosition);
router.put("/positions/:id", PositionsController.editPosition);

module.exports = router;
