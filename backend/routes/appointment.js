const express = require('express');
const {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} = require('../controllers/appointment');
const authentication = require('../middleware/authentication');
const appointmentRouter = express.Router();

// Create a new appointment
appointmentRouter.post('/', authentication, createAppointment);

// Get all appointments
appointmentRouter.get('/', getAppointments);

// Get appointment by ID
appointmentRouter.get('/:id', getAppointmentById);

// Update an appointment
appointmentRouter.put('/:id', updateAppointment);

// Delete an appointment
appointmentRouter.delete('/:id', deleteAppointment);

module.exports = appointmentRouter;
