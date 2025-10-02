import { Link } from "react-router-dom";

export default function QuickServicesSection() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800 backdrop-blur-md transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-extrabold text-white mb-4 tracking-wide animate-fade-in">
        ⚡ Quick Services
      </h2>
      <p className="text-gray-400 mb-6 text-sm leading-relaxed">
        Submit a fast inspection request and get matched instantly with verified inspectors. Speed meets precision.
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          to="/quickInspection"
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          🚀 Start Quick Inspection
        </Link>
        <Link
          to="/customer/quick-requests"
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          📂 View My Requests
        </Link>
      </div>
    </div>
  );
}