const express = require("express");
const router = express.Router();
const DropdownListOptionsController = require("../controllers/dropdown-list-options-controller");

router.get("/options/actions", DropdownListOptionsController.getActionsNames);
router.get("/options/positions", DropdownListOptionsController.getPositionsNames);
router.get("/options/organizations", DropdownListOptionsController.getOrganizationsNames);
router.get("/options/departments", DropdownListOptionsController.getDepartmentsNames);
router.get("/options/employees", DropdownListOptionsController.getEmployeesWithDepartmentsAndPositions);
module.exports = router;
