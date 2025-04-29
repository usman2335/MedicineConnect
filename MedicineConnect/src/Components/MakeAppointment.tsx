import React, { useState } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    alert("Appointment booked successfully!");
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="03xx-xxxxxxx"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="department"
                required
                value={formData.department}
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Gynecology">Gynecology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor
              </label>
              <select
                name="doctor"
                required
                value={formData.doctor}
                onChange={handleChange}
                className="p-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Doctor</option>
                <option value="Dr. Ayesha Khan">Dr. Ayesha Khan</option>
                <option value="Dr. Ahmed Raza">Dr. Ahmed Raza</option>
                <option value="Dr. Fatima Noor">Dr. Fatima Noor</option>
                <option value="Dr. Zain Ali">Dr. Zain Ali</option>
                <option value="Dr. Maria Hussain">Dr. Maria Hussain</option>
              </select>
            </div>
          </div>

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
