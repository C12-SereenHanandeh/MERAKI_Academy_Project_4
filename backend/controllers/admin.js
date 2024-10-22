const User = require("../models/userSchema");
const Department = require("../models/departmentSchema");

// Get all departments
const getAllDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: "Failed to get departments" });
  }
};

// Add a new department
const createDepartment = async (req, res) => {
  const { name } = req.body;
  try {
    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add department" });
  }
};

// Delete a department
 const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    await Department.findByIdAndDelete(id);
    res.status(200).json({ message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete department" });
  }
};


// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: err.message,
    });
  }
};

// Delete a user (admin action)
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: err.message,
    });
  }
};

const patientStatistic = async (req, res) => {
  try {
    const months = ["January", "February", "March", "April", "May"];
    const patientCounts = [30, 50, 40, 60, 80];

    res.json({ months, patientCounts });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const doctorStatistics = async (req, res) => {
  try {
    const statistics = await Doctor.aggregate([]); // استعلام للحصول على الإحصائيات
    res.status(200).json(statistics);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Failed to fetch statistics." });
  }
};

const departmentStatistics = async (req, res) => {
  try {
    const departments = await Department.find();
    const patientCounts = await Promise.all(
      departments.map(async (dept) => {
        const count = await Patient.countDocuments({ department: dept.name });
        return count;
      })
    );

    const names = departments.map((dept) => dept.name);

    res.json({ names, patientCounts });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    await Doctor.findByIdAndDelete(doctorId); // استخدام Mongoose لحذف الطبيب
    res.status(200).json({ message: "Doctor deleted successfully!" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Failed to delete doctor." });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    await Patient.findByIdAndDelete(patientId); 
    res.status(200).json({ message: "Patient deleted successfully!" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Failed to delete patient." });
  }
};





module.exports = {
  getAllDepartment,
  createDepartment,
  deleteDepartment,
  getUsers,
  deleteUser,
  patientStatistic,
  doctorStatistics,
  departmentStatistics,
  deleteDoctor,
  deletePatient,
  
};
