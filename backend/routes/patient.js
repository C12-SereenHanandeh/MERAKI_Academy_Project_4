const express = require('express');
const patientRouter = express.Router();
const {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require('../controllers/patient');

// Create a new patient
patientRouter.post('/', createPatient);

// Get all patient
patientRouter.get('/', getPatients);

// Get a specific patient by ID
patientRouter.get('/:id', getPatientById);

// Update a patient
patientRouter.put('/:id', updatePatient);

// Delete a patient
patientRouter.delete('/:id', deletePatient);

module.exports = patientRouter;
