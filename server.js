const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Sanitize filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Init Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));

// Register Patient Route
app.post(
  "/api/register-patient",
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const { email, password, fullName, age, gender, contactNumber } =
        req.body;

      // Check if patient already exists
      let patient = await Patient.findOne({ email });
      if (patient) {
        return res.status(400).json({ message: "Patient already exists" });
      }

      // Create new patient
      patient = new Patient({
        email,
        password,
        fullName,
        age: Number(age),
        gender,
        contactNumber,
        profilePic: req.file ? `/uploads/${req.file.filename}` : "",
      });

      // Hash password
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      patient.password = await bcrypt.hash(password, salt);

      await patient.save();
      res.status(201).json({ message: "Patient registered successfully" });
    } catch (error) {
      console.error("Patient registration error:", error);
      res.status(400).json({ message: error.message });
    }
  }
);

// Register Doctor Route
app.post(
  "/api/register-doctor",
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const {
        email,
        password,
        fullName,
        age,
        gender,
        contactNumber,
        qualification,
        specialization,
        yearsOfExperience,
        medicalLicenseNumber,
        certifications,
        achievements,
        currentAffiliation,
        ratePerConsult,
      } = req.body;

      // Check if doctor already exists
      let doctor = await Doctor.findOne({ email });
      if (doctor) {
        return res.status(400).json({ message: "Doctor already exists" });
      }

      // Create new doctor
      doctor = new Doctor({
        email,
        password,
        fullName,
        age: Number(age),
        gender,
        contactNumber,
        profilePic: req.file ? `/uploads/${req.file.filename}` : "",
        qualification,
        specialization,
        yearsOfExperience: Number(yearsOfExperience),
        medicalLicenseNumber,
        certifications: certifications
          ? certifications.split(",").map((c) => c.trim())
          : [],
        achievements: achievements
          ? achievements.split(",").map((a) => a.trim())
          : [],
        currentAffiliation,
        ratePerConsult: Number(ratePerConsult) || 200,
      });

      // Hash password
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      doctor.password = await bcrypt.hash(password, salt);

      await doctor.save();
      res.status(201).json({ message: "Doctor registered successfully" });
    } catch (error) {
      console.error("Doctor registration error:", error);
      res.status(400).json({ message: error.message });
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(400)
      .json({ message: "File upload error: " + err.message });
  }
  next(err);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
