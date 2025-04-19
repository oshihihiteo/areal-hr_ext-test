const express = require("express");
const router = express.Router();
const upload = require("../config/files/upload");
const filesController = require("../controllers/files-controller");

router.get("/files", filesController.getAllFiles);
router.get("/employees/:employeeId/files", filesController.getAllEmployeeFiles);
router.get("/files/:id", filesController.getFileById);
router.get("/files/:id/raw", filesController.getRawFileById);
router.post("/files", upload.single("file"), filesController.createFile);
router.delete("/files/:id", filesController.deleteFile);
router.put("/files/:id", upload.single("file"), filesController.editFile);

module.exports = router;
