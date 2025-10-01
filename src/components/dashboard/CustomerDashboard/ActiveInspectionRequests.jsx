import React from "react";
import InspectionRequestCard from "./InspectionRequestCard";

export default function ActiveInspectionRequests({ requests = [] }) {
  return (
    <section className="p-6 bg-gradient-to-br from-[#1c1c1e] via-[#1a1a1c] to-[#121212] rounded-xl shadow-xl animate-fade-in">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6 text-center">
        📋 Your Active Inspection Requests
      </h2>
      {requests.length === 0 ? (
        <div className="text-center text-gray-400 bg-white/5 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-inner animate-fade-in-slow">
          <p className="text-lg font-semibold mb-2">No active requests</p>
          <p className="text-sm">Once you create an inspection, it will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <InspectionRequestCard request={req} />
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.2s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}