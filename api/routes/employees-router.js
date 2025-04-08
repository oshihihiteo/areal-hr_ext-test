const express = require("express");
const router = express.Router();
const EmployeesController = require("../controllers/employees-controller");

router.get("/employees", EmployeesController.getAllEmployees);
router.get("/employees/:id", EmployeesController.getEmployeeById);
router.post("/employees", EmployeesController.createEmployee);
router.delete("/employees/:id", EmployeesController.deleteEmployee);
router.put("/employees/:id", EmployeesController.editEmployee);

module.exports = router;
