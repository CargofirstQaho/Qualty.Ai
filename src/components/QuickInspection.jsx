import React, { useState } from 'react';
import Kolkata from "../assets/kolkata.avif";
import Gujarat from "../assets/gujarat.avif";
import Karnataka from "../assets/karnataka.webp";
import Maharashtra from "../assets/maharashtra.jpg";
import AP from "../assets/AP.webp";
import Telangana from "../assets/telangana.jpg";
import TamilNadu from "../assets/tamilnadu.jpg";
import Chhattisgarh from "../assets/chhattisgarh.jpg";
import UP from "../assets/UP.jpg";
import MP from "../assets/MP.webp";
import China from "../assets/china.jpg";
import Dubai from "../assets/dubai.jpg";
import Qatar from "../assets/qatar.jpg";
import USA from "../assets/usa.jpg";
import Vietnam from "../assets/vietnam.jpg";
import useFetchLocation from '../hooks/useFetchLocation';
import { useUser } from '../context/userContext';
import { Link } from 'react-router-dom'
import LocationDetails from './LocationDetail';


// const localLocations = [
//   { name: 'Kolkata', locations: [
//     { rate: 800, imageUrl: Kolkata },
//   ]},
//   { name: 'Gujarat', locations: [
//     { location: 'Kandla', rate: 1000, imageUrl: Gujarat },
//     { location: 'Gandidham', rate: 1200},
//     { location: 'Tarapur', rate: 1200 },
//     { location: 'Moraj', rate: 1100 },
//     { location: 'Sonagarh', rate: 1200 },
//     { location: 'Azira Port', rate: 1200},
//     { location: 'Mundra', rate: 1200 },
//   ]},
//   { name: 'Karnataka', locations: [
//     { location: 'Mandya', rate: 1300, imageUrl: Karnataka },
//     { location: 'Tumakur', rate: 1300 },
//     { location: 'Raichur', rate: 1300 },
//     { location: 'Bangarpet', rate: 1300 },

//   ]},
//   { name: 'Maharashtra', locations: [
//     { location: 'Nagpur', rate: 900, imageUrl:Maharashtra},
//     { location: 'Mumbai', rate: 1000 },
//     { location: 'Gondiya', rate: 1000},
//     { location: 'Latur', rate: 1200 },
//     { location: 'Sangli', rate: 1200 },
//   ]},
//   { name: 'Andhra Pradesh ', locations: [
//     { location: 'Kadapa', rate: 1300, imageUrl: AP },
//     { location: 'Mandapeta', rate: 1300},
//     { location: 'Nellore', rate: 1300},
//   ]},
//   { name: 'Telangana', locations: [
//     { location: 'Hyderabad', rate: 1300, imageUrl: Telangana },
//   ]},
//   { name: 'Tamil Nadu', locations: [
//     { location: 'Chennai', rate: 1200, imageUrl: TamilNadu },
//   ]},
//   { name: 'Chhattisgarh', locations: [
//     { rate: 800, imageUrl: Chhattisgarh },
//   ]},
//   { name: 'Uttar Pradesh', locations: [
//     { rate: 1200, imageUrl: UP },
//   ]},
//   { name: 'Madhya Pradesh', locations: [
//     {  rate: 1200, imageUrl:MP },
//   ]},
// ];

// const internationalLocations = [
//   { country: 'China', rate: 300, imageUrl: China },
//   { country: 'Dubai', rate: 407, imageUrl: Dubai },
//   { country: 'Qatar', rate: 407, imageUrl: Qatar },
//   { country: 'USA', rate: 1000, imageUrl: USA },
//   { country: 'Vietnam', rate: 300, imageUrl: Vietnam },
// ];


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

  // const visibleDomesticLocations = showMoreDomestic ? localLocations : localLocations.slice(0, 5);
  // const visibleGlobalLocations = showMoreGlobal ? internationalLocations : internationalLocations.slice(0, 5);



  // const handleConfirmClick = (locationInfo) => {
  //   setSelectedLocation(locationInfo);
  //   setFormData(prev => ({ ...prev, location: locationInfo.location || locationInfo.country }));
  //   setShowForm(true);
  // };

  // const handleFormChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   ('Form submitted:', formData);
  //   // Add your submission logic here
  //   setShowForm(false);
  //   // Reset form
  //   setFormData({
  //     location: '',
  //     category: '',
  //     description: '',
  //     date: '',
  //     type: '',
  //     service: '',
  //     contact: '',
  //     volume: '',
  //   });
  // };

  // const closeForm = () => {
  //   setShowForm(false);
  // };


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
