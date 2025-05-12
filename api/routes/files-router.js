const express = require("express");
const router = express.Router();
const upload = require("../config/upload/upload");
const filesController = require("../controllers/files-controller");

router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Авторизуйтесь для доступа" });
    }
    next();
});

router.get("/", filesController.getAllFiles);
router.get("/employees/:employeeId", filesController.getAllEmployeeFiles);
router.get("/:id", filesController.getFileById);
router.get("/:id/raw", filesController.getRawFileById);
router.post("/", upload.single("file"), filesController.createFile);
router.delete("/:id", filesController.deleteFile);
router.put("/:id", upload.single("file"), filesController.editFile);

module.exports = router;
