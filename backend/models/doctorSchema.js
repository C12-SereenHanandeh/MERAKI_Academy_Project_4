const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
