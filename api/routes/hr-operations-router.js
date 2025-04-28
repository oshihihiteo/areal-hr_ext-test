const express = require("express");
const router = express.Router();
const HrOperationsController = require("../controllers/hr-operations-controller");

router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Авторизуйтесь для доступа" });
    }
    next();
});

router.get("/", HrOperationsController.getAllHrOperations);
router.post("/", HrOperationsController.createHrOperation);
router.delete("/:id", HrOperationsController.deleteHrOperation);
router.put("/:id", HrOperationsController.editHrOperation);

module.exports = router;
