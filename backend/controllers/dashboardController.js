// controllers/dashboardController.js

const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

const getDashboardData = async (req, res) => {
  try {
    // Total counts
    const totalAppointments = await Appointment.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();

    // Today's Appointments
    const today = new Date();
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const todayEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const appointmentsToday = await Appointment.find({
      date: { $gte: todayStart, $lt: todayEnd },
    }).populate("patientId doctorId");

    const formattedAppointmentsToday = appointmentsToday.map((appointment) => ({
      patientName: appointment.patientId?.name || "Unknown",
      doctorName: appointment.doctorId?.name || "Unknown",
      status: appointment.status,
    }));

    // Weekly Appointments Count
    const weekStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    ); // Sunday
    const weekEnd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + (6 - today.getDay())
    ); // Saturday

    const appointmentsThisWeek = await Appointment.countDocuments({
      date: { $gte: weekStart, $lte: weekEnd },
    });

    // Appointment Status Summary
    const appointmentStatusSummary = {
      pending: await Appointment.countDocuments({ status: "pending" }),
      completed: await Appointment.countDocuments({ status: "completed" }),
      cancelled: await Appointment.countDocuments({ status: "cancelled" }),
    };

    // Top Doctors (who have the most appointments)
    const topDoctorsAggregate = await Appointment.aggregate([
      { $group: { _id: "$doctorId", appointments: { $sum: 1 } } },
      { $sort: { appointments: -1 } },
      { $limit: 5 },
    ]);

    const topDoctors = await Promise.all(
      topDoctorsAggregate.map(async (doc) => {
        const doctor = await Doctor.findById(doc._id);
        return {
          name: doctor?.name || "Unknown",
          appointments: doc.appointments,
        };
      })
    );

    // Recent Patients (latest registered)
    const recentPatients = await Patient.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const formattedRecentPatients = recentPatients.map((patient) => ({
      name: patient.name,
      joined: patient.createdAt.toISOString().split("T")[0], // Just date, not time
    }));

    res.status(200).json({
      totalAppointments,
      totalDoctors,
      totalPatients,
      appointmentsToday: formattedAppointmentsToday,
      appointmentsThisWeek,
      appointmentStatusSummary,
      topDoctors,
      recentPatients,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getDashboardData };
