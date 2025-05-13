const Doctor = require("../models/Doctor");

// Create
const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: "Error creating doctor", error });
  }
};

// Get all doctors or filter by department
const getDoctors = async (req, res) => {
  const { department } = req.query; // Get department from query params

  try {
    let doctors;

    if (department) {
      // If department is provided, filter doctors by department
      doctors = await Doctor.find({ department });
    } else {
      // If no department is provided, return all doctors
      doctors = await Doctor.find();
    }

    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Read One
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update
const updateDoctor = async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete
const deleteDoctor = async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
  updateDoctor,
};
