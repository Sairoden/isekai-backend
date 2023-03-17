const express = require("express");
const { createUser } = require("./userController");
const { authUser } = require("./userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", authUser);

module.exports = router;
