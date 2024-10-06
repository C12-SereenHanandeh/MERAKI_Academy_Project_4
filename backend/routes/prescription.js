const express = require('express');
const {
    createPrescription,
    getPrescriptions,
    // getPrescriptionById,
    updatePrescription,
    deletePrescription,
} = require('../controllers/prescpiction');
const authentication  = require('../middleware/authentication');
const prescriptionrouter = express.Router();

// Create a new prescription
prescriptionrouter.post('/', authentication, createPrescription);

// Get all prescriptions
prescriptionrouter.get('/', authentication, getPrescriptions);

// Get prescription by ID
// prescriptionrouter.get('/:id', authentication, getPrescriptionById);

// Update a prescription
prescriptionrouter.put('/:id', authentication, updatePrescription);

// Delete a prescription
prescriptionrouter.delete('/:id', authentication, deletePrescription);

module.exports = prescriptionrouter;
