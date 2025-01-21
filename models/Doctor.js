const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String },
    qualification: { type: String, required: true },
    specialization: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    medicalLicenseNumber: { type: String, required: true },
    certifications: { type: [String] },
    achievements: { type: [String] },
    currentAffiliation: { type: String, required: true },
    ratePerConsult: { type: Number, required: true, default: 200 },
});

module.exports = mongoose.model('Doctor', doctorSchema);