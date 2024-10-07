const express = require("express");
const adminRouter = express.Router();
const { getUsers, deleteUser } = require("../controllers/admin");

// Route to get all users
adminRouter.get("/users", getUsers);

// Route to delete a user by ID
adminRouter.delete("/users/:id", deleteUser);

module.exports = adminRouter;
