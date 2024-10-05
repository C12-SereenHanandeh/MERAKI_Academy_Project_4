const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medicalHistory: {
    type: [String],
    required: false,
  },
  insuranceDetails: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
