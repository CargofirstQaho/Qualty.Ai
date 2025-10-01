import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function InspectionRequestCard({ request }) {
  const {
    _id,
    commodityCategory,
    inspectionLocation,
    urgencyLevel,
    inspectionBudget,
    bids,
    lowestBid,
    createdAt,
  } = request;

  const formatted = new Date(createdAt).toLocaleDateString("en-GB");

  const priorityStyles = {
    High: "bg-red-600/20 text-red-400 border border-red-500",
    Medium: "bg-yellow-600/20 text-yellow-400 border border-yellow-500",
    Low: "bg-green-600/20 text-green-400 border border-green-500",
  };

  return (
    <Link to={`/customer/inspection/${_id}`}>
      <div className="bg-[#1e1e20] p-5 rounded-xl border border-[#2a2a2d] shadow-md hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-white">{commodityCategory}</h3>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${priorityStyles[urgencyLevel]}`}>
            {urgencyLevel}
          </span>
        </div>

        <p className="text-sm text-gray-300 flex items-center gap-1 mb-2">
          <FaMapMarkerAlt className="text-gray-500" />
          {inspectionLocation}
        </p>

        <div className="text-sm text-gray-300 space-y-1">
          <p><strong>Budget:</strong> ₹{inspectionBudget}/-</p>
          <p><strong>Bids:</strong> {bids}</p>
          {lowestBid !== undefined && <p><strong>Lowest Bid:</strong> ₹{lowestBid}</p>}
          <p><strong>Date of Enquiry:</strong> {formatted}</p>
        </div>
      </div>
    </Link>
  );
}