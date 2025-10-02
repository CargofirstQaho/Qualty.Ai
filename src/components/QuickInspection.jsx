import React, { useState } from "react";
import Kolkata from "../assets/Kolkata.avif";
import Gujarat from "../assets/Gujarat.avif";
import Karnataka from "../assets/Karnataka.webp";
import Maharashtra from "../assets/Maharashtra.jpg";
import AP from "../assets/AP.webp";
import Telangana from "../assets/Telangana.jpg";
import TamilNadu from "../assets/Tamilnadu.jpg";
import Chhattisgarh from "../assets/Chhattisgarh.jpg";
import UP from "../assets/UP.jpg";
import MP from "../assets/MP.webp";
import China from "../assets/China.jpg";
import Dubai from "../assets/Dubai.jpg";
import Qatar from "../assets/Qatar.jpg";
import USA from "../assets/USA.jpg";
import Vietnam from "../assets/Vietnam.jpg";
import useFetchLocation from "../hooks/useFetchLocation";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuickInspection() {
  useFetchLocation();
  const location = useSelector((state) => state.location?.data);

  const [formData, setFormData] = useState({
    location: "",
    category: "",
    description: "",
    date: "",
    type: "",
    service: "",
    contact: "",
    volume: "",
  });

  const regionImages = {
    Kolkata: Kolkata,
    Gujarat: Gujarat,
    Karnataka: Karnataka,
    Maharashtra: Maharashtra,
    "Andhra & Telangana": AP,
    Telangana: Telangana,
    "Tamil Nadu": TamilNadu,
    Chhattisgarh: Chhattisgarh,
    "Uttar Pradesh": UP,
    "Madhya Pradesh": MP,
    China: China,
    Dubai: Dubai,
    Qatar: Qatar,
    USA: USA,
    Vietnam: Vietnam,
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 sm:px-6 lg:px-10 py-10">
  <h2 className="text-4xl font-extrabold text-center text-white mb-12 animate-fade-in">
    🚀 Quick Services
  </h2>

  <section className="space-y-8">
    <h2 className="text-2xl font-bold text-gray-300 mb-6 border-b border-gray-700 pb-2">
      Domestic Regions
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {location &&
        Object.entries(location).map(([regionName]) => (
          <div
            key={regionName}
            className="group bg-gray-900/60 backdrop-blur-md rounded-xl p-5 flex flex-col items-center shadow-md transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_25px_#3b82f6]"
          >
            <Link to={`/quickInspection/${encodeURIComponent(regionName)}`}>
              <img
                src={regionImages[regionName] || "/fallback.jpg"}
                alt={regionName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-700 transition-all duration-300 group-hover:shadow-[0_0_12px_#3b82f6]"
              />
            </Link>
            <p className="mt-4 text-base sm:text-lg font-semibold text-gray-200 group-hover:text-blue-400 transition-colors duration-300 text-center">
              {regionName}
            </p>
          </div>
        ))}
    </div>
  </section>
</div>

  );
}