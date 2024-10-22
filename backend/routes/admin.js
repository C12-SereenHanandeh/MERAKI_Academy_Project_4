const express = require("express");
const adminRouter = express.Router();
const {
  getUsers,
  getAllDepartment,
  createDepartment,
  deleteDepartment,
  deleteUser,
  patientStatistic,
  doctorStatistics,
  departmentStatistics,
  deleteDoctor,
  deletePatient,
} = require("../controllers/admin");
const Patient = require("../models/userSchema");
const Doctor = require("../models/userSchema");
const Department = require("../models/departmentSchema");

// Route to get all users
adminRouter.get("/users", getUsers);

// Route to get all departments
adminRouter.get("/departments", getAllDepartment);

// Route to create a new department
adminRouter.post("/departments", createDepartment);

// Route to delete a department by ID
adminRouter.delete("/departments/:id", deleteDepartment);

// Route to delete a user by ID
adminRouter.delete("/users/:id", deleteUser);

// Route to get patient statistics
adminRouter.get("/patient-statistics", patientStatistic);

// Route to get doctor statistics
adminRouter.get("/doctor-statistics", doctorStatistics);

// Route to get department statistics
adminRouter.get("/department-statistics", departmentStatistics);

// Route to delete a doctor by ID
adminRouter.delete("/doctors/:id", deleteDoctor);

// Route to delete a patient by ID
adminRouter.delete("/patients/:id", deletePatient);

module.exports = adminRouter;
