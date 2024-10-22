const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // To generate unique department IDs

const DepartmentSchema = new mongoose.Schema({
  departmentId: {
    type: String,
    unique: true,
    default: uuidv4, // Automatically generate a unique ID using UUID
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to doctors in the User schema
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to ensure department names are lowercased
DepartmentSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  next();
});

module.exports = mongoose.model("Department", DepartmentSchema);
