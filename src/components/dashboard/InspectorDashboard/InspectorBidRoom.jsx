import { useDispatch, useSelector } from "react-redux";
import useFetchEnquiries from "../../../hooks/useFetchEnquiries";
import { BASE_URL } from "../../../utils/constants";
import { addPlaceBid } from "../../../redux/slice/bidSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const InspectorBidRoom = () => {
  useFetchEnquiries();
  const dispatch = useDispatch();
  const enquiries = useSelector((state) => state.enquiry.raisedEnquiry);
  const isArray = Array.isArray(enquiries);

  const [bidAmounts, setBidAmounts] = useState({});
  const [disabledBids, setDisabledBids] = useState({});

  const handleAmountChange = (id, value) => {
    setBidAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleBid = async (id) => {
    const bidAmount = Number(bidAmounts[id]);
    if (!bidAmount || bidAmount <= 0) return alert("Enter a valid bid amount");

    try {
      const response = await fetch(`${BASE_URL}/inspector/bid/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: bidAmount }),
      });

      const data = await response.json();
      if (data.success) {
        dispatch(addPlaceBid(data.bid));
        toast.success(data.message);
        setBidAmounts((prev) => ({ ...prev, [id]: "" }));
        setDisabledBids((prev) => ({ ...prev, [id]: true }));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Error placing bid");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">
          All Live Enquiries
        </h1>
        <p className="text-gray-400 mb-8">
          Total Enquiries:{" "}
          <span className="text-blue-400 font-semibold">
            {isArray ? enquiries.length : 0}
          </span>
        </p>

        {!isArray ? (
          <p className="text-gray-500 text-center">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <p className="text-gray-500 text-center">
            No live enquiries available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-lg hover:shadow-blue-500/50 transition-shadow"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  {enquiry.commodityCategory}
                </h2>
                <p className="text-sm text-gray-400 mb-1">
                  Sub-Commodity:{" "}
                  <span className="text-gray-100 font-semibold">
                    {enquiry.subCommodity}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  Location:{" "}
                  <span className="text-gray-100 font-semibold">
                    {enquiry.inspectionLocation}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  Urgency:{" "}
                  <span
                    className={`font-semibold ${
                      enquiry.urgencyLevel === "High"
                        ? "text-red-500"
                        : enquiry.urgencyLevel === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {enquiry.urgencyLevel}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  Budget:{" "}
                  <span className="text-green-400 font-semibold">
                    ₹ {enquiry.inspectionBudget}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  Volume:{" "}
                  <span className="text-gray-100 font-semibold">
                    {enquiry.volume}
                  </span>{" "}
                  | Dates:{" "}
                  <span className="text-gray-100 font-semibold">
                    {new Date(enquiry.inspectionDate.from).toLocaleDateString()}{" "}
                    - {new Date(enquiry.inspectionDate.to).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  Types:{" "}
                  {enquiry.inspectionTypes?.physical && <span>Physical </span>}
                  {enquiry.inspectionTypes?.chemical && <span>Chemical</span>}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  Contact: {enquiry.contact?.email},{" "}
                  {enquiry.contact?.phoneNumber}
                </p>
                {enquiry.additionalServices?.length > 0 && (
                  <p className="text-sm text-gray-400 mb-1">
                    Services: {enquiry.additionalServices.join(", ")}
                  </p>
                )}
                {enquiry.certifications?.length > 0 && (
                  <p className="text-sm text-gray-400 mb-1">
                    Certifications: {enquiry.certifications.join(", ")}
                  </p>
                )}
                {enquiry.description && (
                  <p className="text-sm text-gray-400 mb-2">
                    Note: {enquiry.description}
                  </p>
                )}

                <div className="mt-4 flex gap-2">
                  <input
                    type="number"
                    value={bidAmounts[enquiry._id] || ""}
                    onChange={(e) =>
                      handleAmountChange(enquiry._id, e.target.value)
                    }
                    placeholder="Enter bid amount"
                    className="bg-gray-800 text-white px-3 py-2 rounded w-full outline-none border border-gray-600"
                    disabled={disabledBids[enquiry._id]}
                  />
                  <button
                    onClick={() => handleBid(enquiry._id)}
                    disabled={disabledBids[enquiry._id]}
                    className={`px-4 py-2 rounded text-white font-semibold cursor-pointer ${
                      disabledBids[enquiry._id]
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {disabledBids[enquiry._id] ? "Bid Placed" : "Bid"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectorBidRoom;