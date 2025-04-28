const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/department-controllers");

router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Авторизуйтесь для доступа" });
    }
    next();
});

router.get("/", DepartmentController.getAllDepartments);
router.get("/:id", DepartmentController.getDepartmentById);
router.post("/", DepartmentController.createDepartment);
router.delete("/:id", DepartmentController.deleteDepartment);
router.put("/:id", DepartmentController.editDepartment);

module.exports = router;
