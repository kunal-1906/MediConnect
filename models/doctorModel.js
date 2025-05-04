const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  email: { 
    type: String, 
    required: true
   }, 

  address: {
    type: String,
    required: true,
  },
  specialisation: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  feesPerConsultation: {
    type: Number,
    required: true,
  },
  timings: {
    type: Array,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // must be correct
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

// Export the Doctor model
module.exports = mongoose.model("Doctor", doctorSchema);
