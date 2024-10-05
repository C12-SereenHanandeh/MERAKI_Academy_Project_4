const express = require("express");
const userRouter = express.Router();

const { register } = require("../controllers/users");

// Register a new user
userRouter.post("/register", register);

module.exports = userRouter;
