import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BidCard from "./BidCards";

const LiveBids = () => {
  const raisedEnquiries = useSelector((state) => state.enquiry.raisedEnquiry);
  const navigate = useNavigate();
  const [placedBids, setPlacedBids] = useState({}); 

  const limitedEnquiries = raisedEnquiries?.slice(0, 2) || [];

  const handleBidPlaced = (id) => {
    setPlacedBids((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Live Bids</h2>
        <span className="text-sm text-gray-400">{raisedEnquiries?.length || 0} Active Bids</span>
      </div>

      <section className="space-y-4">
        {limitedEnquiries.length === 0 ? (
          <p className="text-gray-400">No live enquiries available</p>
        ) : (
          limitedEnquiries.map((bid) => (
            <BidCard
              key={bid._id}
              bid={bid}
              bidPlaced={placedBids[bid._id]}
              onBidPlaced={() => handleBidPlaced(bid._id)}
            />
          ))
        )}
      </section>

      {raisedEnquiries?.length > 2 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/inspector/bidding")}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded text-white font-medium cursor-pointer"
          >
            View All →
          </button>
        </div>
      )}
    </section>
  );
};

export default LiveBids;