const express = require('express');
const {
    createPrescription,
    getPrescriptions,
    getPrescriptionById,
    updatePrescription,
    deletePrescription,
} = require('../controllers/prescriptions');
const {authentication  } = require('../middleware/authentication');
const prescriptionrouter = express.Router();

// Create a new prescription
router.post('/', authentication, createPrescription);

// Get all prescriptions
router.get('/', authentication, getPrescriptions);

// Get prescription by ID
router.get('/:id', authentication, getPrescriptionById);

// Update a prescription
router.put('/:id', authentication, updatePrescription);

// Delete a prescription
router.delete('/:id', authentication, deletePrescription);

module.exports = prescriptionrouter;
