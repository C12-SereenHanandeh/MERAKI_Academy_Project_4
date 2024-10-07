const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["Patient", "Doctor", "Admin"],
    required: true,
  },
  // Fields for Patient
  medicalHistory: {
    type: [String],
    required: function () {
      return this.role === "Patient";
    },
  },
  insuranceNumber: {
    type: String,
    required: function () {
      return this.role === "Patient";
    },
  },
  // Fields for Doctor
  image: {
    type: String, // URL to the doctor's image
    required: function () {
      return this.role === "Doctor";
    },
  },
  specialization: {
    type: String,
    required: function () {
      return this.role === "Doctor";
    },
  },
  experienceYears: {
    type: Number,
    required: function () {
      return this.role === "Doctor";
    },
  },
  licenseNumber: {
    type: String,
    required: function () {
      return this.role === "Doctor";
    },
  },
  department: {
    type: String,
    required: function () {
      return this.role === "Doctor";
    },
  },
  // Fields for Admin
  adminPermissions: {
    type: [String],
    required: function () {
      return this.role === "Admin";
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
