import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Appointment: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    department: "",
    doctor: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    department: "",
    doctor: "",
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!formData.department) {
        setDoctors([]);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctors?department=${formData.department}`
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, [formData.department]);

  const validateField = (name: string, value: string) => {
    let error = "";

    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^03\d{2}\d{7}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const today = new Date();
    const selectedDate = new Date(value);

    switch (name) {
      case "fullName":
        if (!nameRegex.test(value))
          error = "Name should contain only letters and spaces.";
        break;
      case "email":
        if (!emailRegex.test(value)) error = "Enter a valid email address.";
        break;
      case "phone":
        if (!phoneRegex.test(value))
          error = "Phone must match format 03xx-xxxxxxx.";
        break;
      case "date":
        if (!value || selectedDate <= today)
          error = "Please select a future date.";
        break;
      case "department":
        if (!value) error = "Department is required.";
        break;
      case "doctor":
        if (!value) error = "Doctor is required.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submitting
    Object.entries(formData).forEach(([key, value]) => {
      if (key in errors) validateField(key, value);
    });

    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (hasErrors) return;

    try {
      await axios.post("http://localhost:5000/api/appointments", {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        preferredDate: formData.date,
        department: formData.department,
        doctor: formData.doctor,
        message: formData.message,
      });

      swalWithBootstrapButtons.fire({
        title: "Appointment Booked!",
        text: "Your appointment has been successfully scheduled.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        date: "",
        department: "",
        doctor: "",
        message: "",
      });
      setDoctors([]);
      setErrors({
        fullName: "",
        email: "",
        phone: "",
        date: "",
        department: "",
        doctor: "",
      });
    } catch (error) {
      console.error("Error booking appointment:", error);
      swalWithBootstrapButtons.fire({
        title: "Booking Failed",
        text: "There was an error booking your appointment. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <section id="appointment" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Book an Appointment
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Schedule your visit with a specialist today.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-blue-50 p-8 rounded-2xl shadow-lg space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`p-3 w-full rounded-lg border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-400 outline-none`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 w-full rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-400 outline-none`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`p-3 w-full rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-400 outline-none`}
                placeholder="03xx-xxxxxxx"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`p-3 w-full rounded-lg border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-400 outline-none`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`p-3 w-full rounded-lg border ${
                  errors.department ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-400 outline-none`}
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Gynecology">Gynecology</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor
              </label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className={`p-3 w-full rounded-lg border ${
                  errors.doctor ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-400 outline-none`}
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc: any) => (
                  <option key={doc._id} value={doc.fullName}>
                    {doc.fullName}
                  </option>
                ))}
              </select>
              {errors.doctor && (
                <p className="text-red-500 text-sm mt-1">{errors.doctor}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (Optional)
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Any special requests or notes for the doctor..."
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Appointment;
