
import React from "react";
import useFetchLocation from "../hooks/useFetchLocation";
import { useUser } from "../context/userContext";

const QuickInspectionLocation = () => {
  useFetchLocation();
  const { location } = useUser();

  // Flatten all state arrays into one list of { location, price }
  const flattenedLocations = location?.data
    ? Object.values(location.data).flat()
    : [];

  const handleConfirm = (city) => {
    (`Confirmed: ${city.location} - ₹${city.price}`);
    // Add navigation or API logic here if needed
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg max-w-md mx-auto space-y-4">
      {flattenedLocations.length > 0 ? (
        flattenedLocations.map((city, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-slate-800 px-4 py-3 rounded-lg border border-slate-700"
          >
            <div>
              <p className="text-lg font-semibold">{city.location}</p>
              <p className="text-sm text-slate-400">₹{city.price}</p>
            </div>
            <button
              onClick={() => handleConfirm(city)}
              className="px-4 py-2 bg-white text-slate-900 font-semibold rounded-md hover:bg-slate-200 transition-all"
            >
              Confirm
            </button>
          </div>
        ))
      ) : (
        <p className="text-slate-400 text-center">Loading locations...</p>
      )}
    </div>
  );
};

export default QuickInspectionLocation;
