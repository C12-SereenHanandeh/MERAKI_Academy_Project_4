const Department = require("../models/departmentSchema");

// Create a new department
const createDepartment = async (req, res) => {
  const { name,description } = req.body;

  try {
    const department = new Department({ name,description });
    await department.save();

    res.status(201).json({ success:true,message: "Department created Successfully", department });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message: "Error to Create Department", department });
  }
};

// Get all department
const getDepartment = async (req, res) => {
  try {
    const department = await Department.find().populate(
      "name"
    );
    res.status(201).json({
      success: true,
      message: `All the department retrived`,
      department,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success:false, message: "Error to Retrive Department", department });
}
};
  

// Get department by name
const getDepatmentById = async (req, res) => {
  const { name } = req.params;
  try {
    const department = await Department.findById(name);

    if (!department) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }
    res.status(202).json({
      success: true,
      message: `Department retrived successfully`,
      department,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        message: `error retrived depatment`,
        error: err,
      });
  }
};

// Update department
const updateDepartment = async (req, res) => {
  const { name } = req.params;
  const updateData = req.body;

  try {
    const appointment = await Appointment.findById(name, updateData, {
      new: true,
    });
    res
      .status(202)
      .json({ success: true, message: `department updated`, appointment });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Delete department
const deleteDepartment = async (req, res) => {
  const { name } = req.params;

  try {
    await Department.findByIdAndDelete(name);
    res.status(200).json({ message: "Department deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  // createDepartment,
  getDepartment,
  getDepatmentById,
  updateDepartment,
  deleteDepartment
};
