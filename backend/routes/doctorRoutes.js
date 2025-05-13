const express = require("express");
const router = express.Router();
const {
  createDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
  updateDoctor,
} = require("../controllers/doctorController");

// Create a new doctor
router.post("/", createDoctor);

// Get all doctors
router.get("/", getDoctors);

// Get a specific doctor by ID
router.get("/:id", getDoctorById);

// Delete a doctor
router.delete("/:id", deleteDoctor);

// Update a doctor
router.put("/:id", updateDoctor);

module.exports = router;
