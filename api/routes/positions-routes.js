const express = require("express");
const router = express.Router();
const PositionsController = require("../controllers/positions-controllers");

router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Авторизуйтесь для доступа" });
    }
    next();
});

router.get("/", PositionsController.getAllPositions);
router.get("/:id", PositionsController.getPositionById);
router.post("/", PositionsController.createPosition);
router.delete("/:id", PositionsController.deletePosition);
router.put("/:id", PositionsController.editPosition);

module.exports = router;
