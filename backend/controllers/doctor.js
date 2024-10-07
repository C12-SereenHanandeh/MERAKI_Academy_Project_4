const User = require("../models/userSchema");

// Create a new Doctor
const createDoctor = async (req, res) => {
  const { name, email, password, department, specialization } = req.body;

  try {
    const newDoctor = new User({
      name,
      email,
      password,
      role: "Doctor",
      department,
      specialization,
    });

    await newDoctor.save();
    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: newDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create doctor",
      error: error.message,
    });
  }
};

// Get all Doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
      success: true,
      message: "Doctors retrieved successfully",
      data: doctors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctors",
      error: error.message,
    });
  }
};

// Get a Doctor by ID
const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await User.findById(id);
    if (!doctor || doctor.role !== "Doctor") {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctor retrieved successfully",
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor",
      error: error.message,
    });
  }
};

// Update a Doctor by ID
const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const doctor = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!doctor || doctor.role !== "Doctor") {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update doctor",
        error: error.message,
      });
  }
};

// Delete a Doctor
const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await User.findByIdAndDelete(id);
    if (!doctor || doctor.role !== "Doctor") {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete doctor",
      error: error.message,
    });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
