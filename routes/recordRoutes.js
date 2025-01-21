const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const Record = require('../models/Record');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor'); // Import the Doctor model

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Upload a new record
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const { data } = req.body;
    const filePath = req.file.path;
    const record = new Record({
        patient: req.user._id,
        data,
        filePath,
    });
    try {
        await record.save();
        res.status(201).json({ message: 'Record uploaded successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error uploading record', error: error.message });
    }
});

// Retrieve records for the logged-in patient
router.get('/', authMiddleware, async (req, res) => {
    try {
        const records = await Record.find({ patient: req.user._id });
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching records', error: error.message });
    }
});

// Share a record with a doctor
router.post('/share', authMiddleware, async (req, res) => {
    const { doctorId, recordId } = req.body;
    try {
        const doctor = await Doctor.findById(doctorId); // Ensure Doctor model is used here
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const record = await Record.findById(recordId);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        // Share record (metadata on blockchain can be added here)
        res.status(200).json({
            message: `Record ${recordId} shared with doctor ${doctor.fullName}`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error sharing record', error: error.message });
    }
});

module.exports = router;