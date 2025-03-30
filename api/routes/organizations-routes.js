const express = require("express");
const router = express.Router();
const OrganizationsController = require("../controllers/organizations-controllers");

router.get("/organizations", OrganizationsController.getAllOrganizations);
router.get("/organizations/:id", OrganizationsController.getOrganizationById);
router.post("/organizations", OrganizationsController.createOrganization);
router.delete("/organizations/:id", OrganizationsController.deleteOrganization);
router.put("/organizations/:id", OrganizationsController.editOrganization);

module.exports = router;
