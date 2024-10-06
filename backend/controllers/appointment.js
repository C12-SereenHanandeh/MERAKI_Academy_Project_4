const Appointment = require("../models/appointmentSchema");



// Create a new appointment
const createAppointment = async (req, res) => {
  const { patientId, doctorId, date, time } = req.body;

  try {
    const appointment = new Appointment({ patientId, doctorId, date, time });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate(
      "patientId doctorId"
    );
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Update an appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await Appointment.findByIdAndDelete(id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { createAppointment,getAppointments,updateAppointment, deleteAppointment };
