const express = require("express");
const { createUser, authUser, getAllUsers } = require("./userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", authUser);
router.get("/users", getAllUsers);

module.exports = router;
