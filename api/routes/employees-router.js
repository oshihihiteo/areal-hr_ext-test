const express = require("express");
const router = express.Router();
const EmployeesController = require("../controllers/employees-controller");

router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Авторизуйтесь для доступа" });
    }
    next();
});

router.get("/", EmployeesController.getAllEmployees);
router.get("/:id", EmployeesController.getEmployeeById);
router.post("/", EmployeesController.createEmployee);
router.delete("/:id", EmployeesController.deleteEmployee);
router.put("/:id", EmployeesController.editEmployee);

module.exports = router;
