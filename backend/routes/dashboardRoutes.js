// dashboardRoutes.js

const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");

// Get Dashboard Stats
router.get("/", async (req, res) => {
  try {
    // Counting the total number of documents
    const totalAppointments = await Appointment.countDocuments();
    const totalDoctors = await Doctor.countDocuments(); // Counting doctors from the 'Doctor' collection
    const totalPatients = await User.countDocuments({ role: "patient" }); // Counting patients only

    res.status(200).json({
      totalAppointments,
      totalDoctors,
      totalPatients,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
