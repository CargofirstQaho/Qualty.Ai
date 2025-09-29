import { FaMapMarkerAlt, FaUserTie, FaCheckCircle } from "react-icons/fa";

export default function CustomerHistoryCard({ enquiry, onViewDetails }) {
  const {
    title,
    status,
    category,
    location,
    date,
    cost,
    bidClosed,
    savings,
    inspector,
  } = enquiry;
   

  const statusColor = {
    completed: "bg-green-600",
    "in progress": "bg-yellow-500",
    pending: "bg-gray-600",
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-blue-500/30 transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            statusColor[status.toLowerCase()] || "bg-gray-700"
          } text-white`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      <div className="text-sm text-gray-300 space-y-1 mb-4">
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Location:</strong> <FaMapMarkerAlt className="inline mr-1" /> {location}</p>
        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>Cost:</strong> ₹{cost}</p>
        <p><strong>Bid Closed:</strong> ₹{bidClosed}</p>
        <p><strong>Savings:</strong> ₹{savings}</p>
      </div>

      <button
        onClick={onViewDetails}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm w-full cursor-pointer"
      >
        <FaCheckCircle className="inline mr-2" />
        View Details
      </button>
    </div>
  );
}