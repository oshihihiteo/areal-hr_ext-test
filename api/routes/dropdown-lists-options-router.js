const express = require("express");
const router = express.Router();
const DropdownListOptionsController = require("../controllers/dropdown-list-options-controller");

// router.use((req, res, next) => {
//     if (!req.isAuthenticated()) {
//         return res.status(401).json({ message: "Авторизуйтесь для доступа" });
//     }
//     next();
// });

router.get("/actions", DropdownListOptionsController.getActionsNames);
router.get(
  "/positions",
  DropdownListOptionsController.getPositionsNames,
);
router.get(
  "/organizations",
  DropdownListOptionsController.getOrganizationsNames,
);
router.get(
  "/departments",
  DropdownListOptionsController.getDepartmentsNames,
);
router.get(
  "/employees",
  DropdownListOptionsController.getEmployeesWithDepartmentsAndPositions,
);
module.exports = router;
