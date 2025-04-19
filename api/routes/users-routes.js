const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/user-controller");

router.get("/users", UsersController.getAllUsers);
router.get("/users/:id", UsersController.getUserById);
router.post("/users", UsersController.createUser);
router.delete("/users/:id", UsersController.deleteUser);
router.put("/users/:id", UsersController.editUser);
router.put("/users/:id/limit-access", UsersController.limitUserAccess);

module.exports = router;
