const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/user-controller");

router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Авторизуйтесь для доступа" });
    }
    next();
});

router.get("/", UsersController.getAllUsers);
router.get("/:id", UsersController.getUserById);
router.post("/", UsersController.createUser);
router.delete("/:id", UsersController.deleteUser);
router.put("/:id", UsersController.editUser);
router.put("/:id/limit-access", UsersController.limitUserAccess);

module.exports = router;
