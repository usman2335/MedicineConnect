import React, { useEffect, useRef } from "react";
import doc1 from "../assets/FemaleDoctor1.png";
import doc2 from "../assets/MaleDoctor1.png";
import doc3 from "../assets/FemaleDoctor2.png";
import doc4 from "../assets/MaleDoctor2.png";
import doc5 from "../assets/FemaleDoctor3.png";

interface Doctor {
  name: string;
  specialization: string;
  image: string;
}

const doctors: Doctor[] = [
  { name: "Dr. Ayesha Khan", specialization: "Cardiologist", image: doc1 },
  { name: "Dr. Ahmed Raza", specialization: "Neurologist", image: doc2 },
  { name: "Dr. Fatima Noor", specialization: "Pediatrician", image: doc3 },
  { name: "Dr. Zain Ali", specialization: "Dermatologist", image: doc4 },
  { name: "Dr. Maria Hussain", specialization: "Gynecologist", image: doc5 },
];

const VISIBLE_COUNT = 3;

const DoctorsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const scrollAmount = el.clientWidth / VISIBLE_COUNT;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });

      // loop back to start when reaching the end
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-white" id="doctors">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Meet Our Specialists
        </h2>

        {/* scroll container: hide scrollbar, snap cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 basis-1/3 snap-start bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-80 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {doc.name}
              </h3>
              <p className="text-blue-600">{doc.specialization}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
