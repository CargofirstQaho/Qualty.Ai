import React, { useState } from 'react';
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
import useFetchLocation from '../hooks/useFetchLocation';
import { useUser } from '../context/userContext';
import { Link } from 'react-router-dom'



export default function QuickInspection() {

  useFetchLocation()
  const { location } = useUser()
  (" location from context", location);


  const [selectedCity, setSelectedCity] = useState(null);
  const [showMoreDomestic, setShowMoreDomestic] = useState(false);
  const [showMoreGlobal, setShowMoreGlobal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [formData, setFormData] = useState({
    location: '',
    category: '',
    description: '',
    date: '',
    type: '',
    service: '',
    contact: '',
    volume: '',
  });

  const regionImages = {
    "Kolkata": Kolkata,
    "Gujarat": Gujarat,
    "Karnataka": Karnataka,
    "Maharashtra": Maharashtra,
    "Andhra & Telangana": AP,
    "Telangana": Telangana,
    "Tamil Nadu": TamilNadu,
    "Chhattisgarh": Chhattisgarh,
    "Uttar Pradesh": UP,
    "Madhya Pradesh": MP,
    "China": China,
    "Dubai": Dubai,
    "Qatar": Qatar,
    "USA": USA,
    "Vietnam": Vietnam,
  };



  return (

    <div>
      quick Inspection
        <section className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-300 mb-8">Domestic</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {location?.success && 
          Object.entries(location.data).map(([regionName]) => (
            <div key={regionName} className="flex flex-col items-center space-y-4">
              <Link to={`/quickInspection/${encodeURIComponent(regionName)}`}>
                <img
                  src={regionImages[regionName] || "/fallback.jpg"}
                  alt={regionName}
                  className="w-20 h-20 rounded-full cursor-pointer border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:scale-105 object-cover"
                />
              </Link>
              <p className="font-light text-gray-200 text-center">{regionName}</p>
            </div>
          ))}
      </div>
    </section>

    </div>
  );
}
