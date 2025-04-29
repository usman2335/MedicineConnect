import React from "react";
import { HeartPulse, Stethoscope, Clock } from "lucide-react";

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <HeartPulse className="w-10 h-10 text-blue-600" />,
      title: "Emergency Care",
      description:
        "Immediate assistance with modern emergency services available any time you need.",
    },
    {
      icon: <Stethoscope className="w-10 h-10 text-blue-600" />,
      title: "Qualified Doctors",
      description:
        "Our team consists of highly trained and certified medical professionals.",
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      title: "24/7 Service",
      description:
        "Round-the-clock support and consultations whenever you need medical help.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
