const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
});

module.exports = mongoose.model('Patient', PatientSchema);