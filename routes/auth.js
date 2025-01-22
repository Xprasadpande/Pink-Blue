const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// Register patient
router.post("/register-patient", async (req, res) => {
  const { email, password, fullName, age, gender, contactNumber, profilePic } =
    req.body;

  try {
    let patient = await Patient.findOne({ email });
    if (patient) {
      return res.status(400).json({ msg: "Patient already exists" });
    }

    patient = new Patient({
      email,
      password,
      fullName,
      age,
      gender,
      contactNumber,
      profilePic,
    });

    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(password, salt);

    await patient.save();

    const payload = {
      user: {
        id: patient.id,
        type: "patient",
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Register doctor
router.post("/register-doctor", async (req, res) => {
  const {
    email,
    password,
    fullName,
    age,
    gender,
    contactNumber,
    profilePic,
    qualification,
    specialization,
    yearsOfExperience,
    medicalLicenseNumber,
    certifications,
    achievements,
    currentAffiliation,
    ratePerConsult,
  } = req.body;

  try {
    let doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res.status(400).json({ msg: "Doctor already exists" });
    }

    doctor = new Doctor({
      email,
      password,
      fullName,
      age,
      gender,
      contactNumber,
      profilePic,
      qualification,
      specialization,
      yearsOfExperience,
      medicalLicenseNumber,
      certifications,
      achievements,
      currentAffiliation,
      ratePerConsult,
    });

    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(password, salt);

    await doctor.save();

    const payload = {
      user: {
        id: doctor.id,
        type: "doctor",
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login patient
router.post("/login-patient", async (req, res) => {
  const { email, password } = req.body;

  try {
    let patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: patient.id,
        type: "patient",
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login doctor
router.post("/login-doctor", async (req, res) => {
  const { email, password } = req.body;

  try {
    let doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: doctor.id,
        type: "doctor",
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
