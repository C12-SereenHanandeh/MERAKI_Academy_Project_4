const express = require('express');
const {
    // createDepartment,
    getDepartment,
    getDepatmentById,
    updateDepartment,
    deleteDepartment,
} = require('../controllers/department');
const departmentRouter = express.Router();

// // Create a new department
// departmentRouter.post('/', createDepartment);

// Get all department
departmentRouter.get('/', getDepartment);

// Get department by name
departmentRouter.get('/:id', getDepatmentById);

// Update an department
departmentRouter.put('/:id', updateDepartment);

// Delete an department
departmentRouter.delete('/:id', deleteDepartment);

module.exports = departmentRouter;
