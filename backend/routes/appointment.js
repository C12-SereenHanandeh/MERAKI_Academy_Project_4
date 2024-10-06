const express = require('express');
const {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} = require('../controllers/appointmentController');
const { authentication } = require('../middleware/authentication');
const appointmentRouter = express.Router();

// Create a new appointment
appointmentRouter.post('/', authentication, createAppointment);

// Get all appointments
appointmentRouter.get('/', authentication, getAppointments);

// Get appointment by ID
appointmentRouter.get('/:id', authentication, getAppointmentById);

// Update an appointment
appointmentRouter.put('/:id', authentication, updateAppointment);

// Delete an appointment
appointmentRouter.delete('/:id', authentication, deleteAppointment);

module.exports = router;
