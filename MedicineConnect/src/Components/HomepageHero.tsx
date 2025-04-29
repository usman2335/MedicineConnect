import React from "react";
import doctorImage from "../assets/Doctor2.png"; // Update this path as needed

const HomePageHero: React.FC = () => {
  return (
    <section className="bg-[#f8f9ff] min-h-screen flex items-center px-8 md:px-16 py-12">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Serving Your <br />
            Health Needs Is <br />
            Our Priority.
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            There's nothing more important than our good health, because that's
            our principal capital asset for our good future.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Make Appointment
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <img
            src={doctorImage}
            alt="Doctor"
            className="max-w-xs md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default HomePageHero;
