const { model } = require("mongoose");
const Prescription = require("../models/prescriptionSchema");

// Create a new prescription
const createPrescription = async (req, res) => {
  const { doctorId, patientId, medication, dosage, instructions } = req.body;

  try {
    const prescription = new Prescription({
      doctorId,
      patientId,
      medication,
      dosage,
      instructions,
    });
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get all prescriptions
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate(
      "doctorId patientId"
    );
    res.json(prescriptions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Update a prescription
const updatePrescription = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const prescription = await Prescription.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(prescription);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Delete a prescription
const deletePrescription = async (req, res) => {
  const { id } = req.params;

  try {
    await Prescription.findByIdAndDelete(id);
    res.json({ message: "Prescription deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createPrescription,
  getPrescriptions,
  updatePrescription,
  deletePrescription,
};
