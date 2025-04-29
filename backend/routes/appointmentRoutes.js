const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
  updateAppointment,
} = require("../controllers/appointmentController");

// Create a new appointment
router.post("/", createAppointment);

// Get all appointments
router.get("/", getAppointments);

// Get a specific appointment by ID
router.get("/:id", getAppointmentById);

// Delete an appointment
router.delete("/:id", deleteAppointment);

// Update an appointment
router.put("/:id", updateAppointment);

module.exports = router;
