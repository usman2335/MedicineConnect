import React from "react";
import { Mail, Phone, MapPin, Award, Clock } from "lucide-react";

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
          About Medicine Connect
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Email Us
                </h3>
                <a
                  href="mailto:support@medicineconnect.com"
                  className="text-blue-600"
                >
                  support@medicineconnect.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
                <a href="tel:+1234567890" className="text-blue-600">
                  +123-456-7890
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">
                  123 Health St., Medical City, ABC
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Award className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Our Mission
                </h3>
                <p className="text-gray-600">
                  To provide seamless access to top medical professionals,
                  ensuring every patient receives high-quality, compassionate
                  care—anytime, anywhere.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Our Values
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Integrity</li>
                <li>Compassion</li>
                <li>Innovation</li>
                <li>Excellence</li>
              </ul>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Hours</h3>
                <p className="text-gray-600">
                  Open 24/7 for all your healthcare needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
