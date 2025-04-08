const express = require("express");
const router = express.Router();
const HrOperationsController = require("../controllers/hr-operations-controller");

router.get("/hr-operations", HrOperationsController.getAllHrOperations);
router.post("/hr-operations", HrOperationsController.createHrOperation);
router.delete("/hr-operations/:id", HrOperationsController.deleteHrOperation);
router.put("/hr-operations/:id", HrOperationsController.editHrOperation);

module.exports = router;
