import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function InspectionRequestCard({ request }) {
  const { _id, commodityCategory, inspectionLocation, urgencyLevel, inspectionBudget, bids, lowestBid, createdAt } = request;
  
  const date=new Date(createdAt)
  const formatted=date.toLocaleDateString("en-GB")

  const priorityStyles = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <Link to={`/customer/inspection/${_id}`}>
    <div className="bg-gray-900 rounded-lg shadow-md p-5 hover:shadow-xl transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-300">{commodityCategory}</h3>
        <span className={`px-3 py-1 text-xs font-bold rounded-full ${priorityStyles[urgencyLevel]}`}>
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
        {lowestBid !== undefined && <p><strong>Lowest Bid:</strong> ${lowestBid}</p>}
        <p><strong>Date of Enquiry: </strong> {formatted}</p>
      </div>
    </div>
    </Link>
  );
}