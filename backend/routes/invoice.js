const express = require("express");
const {
  createInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoice");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const invoiceRouter = express.Router();

// Create a new invoice
invoiceRouter.post("/", authentication, authentication, createInvoice);

// Get all invoice
invoiceRouter.get("/",  getInvoice);

// Update a invoice
invoiceRouter.put("/:id", updateInvoice);

// Delete a invoice
invoiceRouter.delete("/:id",  deleteInvoice);

module.exports = invoiceRouter;
