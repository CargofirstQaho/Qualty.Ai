import { FaMapMarkerAlt, FaUserTie, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function CustomerHistoryCard({ enquiry }) {
  const {
    _id,
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

  const navigate = useNavigate();

  const statusColor = {
    completed: "bg-green-600",
    "in progress": "bg-yellow-500",
    pending: "bg-gray-600",
  };

  return (
    <div className="bg-[#1e1e20] p-6 rounded-xl border border-[#2a2a2d] shadow-md hover:shadow-blue-500/30 transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            statusColor[status.toLowerCase()] || "bg-gray-700"
          } text-white shadow-sm`}
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
        {inspector && (
          <p><strong>Inspector:</strong> <FaUserTie className="inline mr-1" /> {inspector.name} - {inspector.company}</p>
        )}
      </div>

      <button
        onClick={() => navigate(`/customer/enquiry/${_id}`)}
        className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded font-semibold text-sm w-full transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <FaCheckCircle className="inline mr-2" />
        View Details
      </button>
    </div>
  );
}