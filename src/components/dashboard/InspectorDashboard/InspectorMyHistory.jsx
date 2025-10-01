import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";

const InspectorHistory = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${BASE_URL}/inspector/history`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        
        if (data.success) {
          setBids(data.bids);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err || "Failed to load history");
      }
    };
    fetchHistory();
  }, []);

  const formatDateRange = (from, to) => {
    const fromDate = new Date(from).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const toDate = new Date(to).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return `${fromDate} → ${toDate}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f11] via-[#1a1a1c] to-[#121212] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 mb-2 tracking-wide">
            My Bid History
          </h1>
          <p className="text-gray-400 text-sm">All bids placed by you as an inspector</p>
        </div>

        {bids.length === 0 ? (
          <p className="text-center text-gray-400">No bids placed yet.</p>
        ) : (
          <div className="space-y-6">
            {bids.map(({ _id, amount, status, enquiry, customerViewAmount }) => (
              <div
                key={_id}
                className="bg-[#1e1e20] border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-green-500/30 transition-all duration-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300">
                  <p><strong>Commodity:</strong> {enquiry.commodityCategory}</p>
                  <p><strong>SubCommodity:</strong> {enquiry.subCommodity}</p>
                  <p><strong>Location:</strong> {enquiry.inspectionLocation}</p>
                  <p><strong>Urgency:</strong> <span className={`font-semibold ${enquiry.urgencyLevel === "High" ? "text-red-400" : "text-yellow-400"}`}>{enquiry.urgencyLevel}</span></p>
                  <p><strong>Inspection Date:</strong> {formatDateRange(enquiry.inspectionDate.from, enquiry.inspectionDate.to)}</p>
                  <p><strong>Bid Amount:</strong> ₹{amount}</p>
                  {/* <p><strong>Customer View:</strong> ₹{customerViewAmount}</p> */}
                  <p><strong>Status:</strong> <span className={`font-semibold ${status === "accepted" ? "text-green-400" : "text-yellow-400"}`}>{status}</span></p>
                  <p><strong>Certifications:</strong> {enquiry.certifications?.join(", ") || "None"}</p>
                  <p><strong>Services:</strong> {enquiry.additionalServices?.join(", ") || "None"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InspectorHistory;