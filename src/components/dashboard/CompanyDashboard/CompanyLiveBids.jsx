import React, { useState } from "react";
import { FileText } from "lucide-react";

const CompanyLiveBids = () => {
  const [bidAmount, setBidAmount] = useState("");

  const handleBid = () => {
    ("Bid submitted:", bidAmount);
    // Add your bid submission logic here
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl p-6 shadow-xl w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Live Bids</h2>
        <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
          2 Active Bids
        </span>
      </div>

      {/* Bid Card */}
      <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-5 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Left Section */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">Inspection</h3>
          <p className="text-sm text-gray-400">ID: SAMPLE-003</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-300">
            <div>
              <p className="font-medium">Location</p>
              <p className="text-gray-400">—</p>
            </div>
            <div>
              <p className="font-medium">Volume</p>
              <p className="text-gray-400">—</p>
            </div>
            <div>
              <p className="font-medium">Urgency</p>
              <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full mt-1">
                High
              </span>
            </div>
            <div>
              <p className="font-medium">Budget</p>
              <p className="text-green-400 font-semibold mt-1">$800 - $1200</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="$ Enter"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleBid}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyLiveBids;
