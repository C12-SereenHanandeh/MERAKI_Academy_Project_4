const Invoice = require("../models/invoiceSchema");
const Service = require("../models/serviceSchema");

//create new invoice
const createInvoice = async (req, res) => {
  const { patientId, amount, date, serviceId, status } = req.body;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    //create new invoice
    const invoice = new Invoice({
      patientId,
      amount,
      date,
      service:serviceId,
      status,
    });
    await invoice.save();
    const populatedInvoice = await Invoice.findById(invoice._id).populate(
      "service"
    );

    res
      .status(201)
      .json({ message: "Invoice created ", invoice: populatedInvoice });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get all invoices
const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.find().populate("patientId");
    res.status(201).json({
      success: true,
      message: "Invoices returned",
      invoice,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Update a invoice
const updateInvoice = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const invoice = await Invoice.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res
      .status(201)
      .json({ success: true, message: "Invoice Updated", invoice });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Delete a invoce
const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    await Invoice.findByIdAndDelete(id);
    res.status(200).json({ message: "Invoice deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
};
