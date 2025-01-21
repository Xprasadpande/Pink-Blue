const express = require('express');
const bcrypt = require('bcryptjs');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { generateToken } = require('../utils/jwtUtils');

const router = express.Router();

// Register patient route
router.post('/register-patient', async (req, res) => {
    const { username, password, email, fullName, age, gender, contactNumber, profilePic } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = new Patient({
        username, password: hashedPassword, email, fullName, age, gender, contactNumber, profilePic
    });
    try {
        await patient.save();
        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Patient registration failed', error: error.message });
    }
});

// Register doctor route
router.post('/register-doctor', async (req, res) => {
    const {
        username, password, email, fullName, age, gender, contactNumber, profilePic,
        qualification, specialization, yearsOfExperience, medicalLicenseNumber,
        certifications, achievements, currentAffiliation, ratePerConsult
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({
        username, password: hashedPassword, email, fullName, age, gender, contactNumber, profilePic,
        qualification, specialization, yearsOfExperience, medicalLicenseNumber,
        certifications, achievements, currentAffiliation, ratePerConsult
    });
    try {
        await doctor.save();
        res.status(201).json({ message: 'Doctor registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Doctor registration failed', error: error.message });
    }
});

// Login route for patients
router.post('/login-patient', async (req, res) => {
    const { username, password } = req.body;
    try {
        const patient = await Patient.findOne({ username });
        if (!patient) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(patient._id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login route for doctors
router.post('/login-doctor', async (req, res) => {
    const { username, password } = req.body;
    try {
        const doctor = await Doctor.findOne({ username });
        if (!doctor) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(doctor._id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all doctors
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
});

module.exports = router;