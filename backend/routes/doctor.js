const express = require('express');
const doctorRouter = express.Router();
const {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctor');

// Create a new doctor
doctorRouter.post('/', createDoctor);

// Get all doctors
doctorRouter.get('/', getDoctors);

// Get a specific doctor by ID
doctorRouter.get('/:id', getDoctorById);

// Update a doctor
doctorRouter.put('/:id', updateDoctor);

// Delete a doctor
doctorRouter.delete('/:id', deleteDoctor);

module.exports = doctorRouter;
