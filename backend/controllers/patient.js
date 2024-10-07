const User = require("../models/userSchema");

// Create a new Patient
const createPatient = async (req, res) => {
  const { name, email, password, insuranceProvider } = req.body;

  try {
    const newPatient = new User({
      name,
      email,
      password,
      role: "Patient",
      insuranceProvider,
    });

    await newPatient.save();
    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: newPatient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create patient",
      error: error.message,
    });
  }
};

// Get all Patients
const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "Patient" });
    res.status(200).json({
      success: true,
      message: "Patients retrieved successfully",
      data: patients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve patients",
      error: error.message,
    });
  }
};

// Get a Patient by ID
const getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await User.findById(id);
    if (!patient || patient.role !== "Patient") {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    res.status(200).json({
      success: true,
      message: "Patient retrieved successfully",
      data: patient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve patient",
      error: error.message,
    });
  }
};

// Update a Patient by ID
const updatePatient = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const patient = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!patient || patient.role !== "Patient") {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: patient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update patient",
      error: error.message,
    });
  }
};

// Delete a Patient
const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await User.findByIdAndDelete(id);
    if (!patient || patient.role !== "Patient") {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete patient",
      error: error.message,
    });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
