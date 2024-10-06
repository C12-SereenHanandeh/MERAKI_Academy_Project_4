const express = require("express");
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
} = require("../controllers/service");

const authentication = require("../middleware/authentication");
const serviceRouter = express.Router();

// Create a new service
serviceRouter.post("/", authentication, createService);

// Get all services
serviceRouter.get("/", getAllServices);

// Update a service
serviceRouter.put("/:id", updateService);

// Delete a service
serviceRouter.delete("/:id", deleteService);

module.exports = serviceRouter;
