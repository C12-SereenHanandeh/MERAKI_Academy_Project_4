const express = require('express');
const {
    createPrescription,
    getPrescriptions,
    updatePrescription,
    deletePrescription,
} = require('../controllers/prescpiction');
const authentication  = require('../middleware/authentication');
const prescriptionRouter = express.Router();

// Create a new prescription
prescriptionRouter.post('/', authentication, createPrescription);

// Get all prescriptions
prescriptionRouter.get('/', getPrescriptions);

// Update a prescription
prescriptionRouter.put('/:id', updatePrescription);

// Delete a prescription
prescriptionRouter.delete('/:id', deletePrescription);

module.exports = prescriptionRouter;
