const express = require("express");
const router = express.Router();
const OrganizationsController = require("../controllers/organizations-controllers");

router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Авторизуйтесь для доступа" });
    }
    next();
});

router.get("/", OrganizationsController.getAllOrganizations);
router.get("/:id", OrganizationsController.getOrganizationById);
router.post("/", OrganizationsController.createOrganization);
router.delete("/:id", OrganizationsController.deleteOrganization);
router.put("/:id", OrganizationsController.editOrganization);

module.exports = router;
