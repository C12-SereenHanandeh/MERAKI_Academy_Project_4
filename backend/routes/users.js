const express = require("express");
const userRouter = express.Router();

const { register, login } = require("../controllers/users");

// Register a new user
userRouter.post("/register", register);

// login a user
userRouter.post("/login", login);

module.exports = userRouter;
