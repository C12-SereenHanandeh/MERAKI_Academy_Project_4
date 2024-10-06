const Appointment = require("../models/AppointmentSchema");

// Create a new appointment
exports.createAppointment = async (req, res) => {
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
exports.getAppointments = async (req, res) => {
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
exports.updateAppointment = async (req, res) => {
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
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await Appointment.findByIdAndDelete(id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
