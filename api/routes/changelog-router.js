const express = require("express");
const router = express.Router();
const ChangelogController = require("../controllers/changelog-controller");
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Авторизуйтесь для доступа" });
    }
    next();
});

router.get("/", ChangelogController.getChangelog);

module.exports = router;
