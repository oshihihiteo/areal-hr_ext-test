const express = require("express");
const router = express.Router();
const DepartmentController = require("../controllers/department-controllers");

router.get("/departments", DepartmentController.getAllDepartments);
router.get("/departments/:id", DepartmentController.getDepartmentById);
router.post("/departments", DepartmentController.createDepartment);
router.delete("/departments/:id", DepartmentController.deleteDepartment);
router.put("/departments/:id", DepartmentController.editDepartment);

module.exports = router;
