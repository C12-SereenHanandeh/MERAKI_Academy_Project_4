const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    
    dep_name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
