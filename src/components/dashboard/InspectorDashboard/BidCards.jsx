
import React, { useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addPlaceBid } from "../../../redux/slice/bidSlice";
import { toast } from "react-toastify";

const BidCard = ({ bid, bidPlaced, onBidPlaced }) => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const {
    _id: id,
    inspectionLocation: location,
    urgencyLevel: urgency,
    inspectionBudget: budget,
    commodityCategory: commodity,
    subCommodity,
  } = bid;

  const handleBid = async () => {
    const bidAmount = Number(amount);
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
        setAmount(""); 
        onBidPlaced(); 
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Bid error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 m-5 flex justify-between items-center shadow-lg hover:shadow-blue-500/50">
      <div className="space-y-1">
        <p className="text-md font-semibold text-gray-400">
          Commodity: <span className="text-gray-100">{commodity}</span>
        </p>
        <p className="text-md font-semibold text-gray-400">
          SubCommodity: <span className="text-gray-100">{subCommodity}</span>
        </p>
        <p className="text-md font-semibold text-gray-400">
          Location: <span className="text-gray-100">{location}</span>
        </p>
        <p className="text-md font-semibold text-gray-400">
          Urgency:{" "}
          <span className={`font-semibold ${urgency === "High" ? "text-red-500" : "text-yellow-400"}`}>
            {urgency}
          </span>
        </p>
        <p className="text-md font-semibold text-gray-400">
          Budget: <span className="font-semibold text-green-400">₹{budget}/-</span>
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        {bidPlaced ? (
          <div className="text-green-400 font-semibold text-sm">✅ Bid Placed</div>
        ) : (
          <>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₹ Enter bid amount"
              className="bg-gray-700 text-white px-3 py-2 rounded w-full outline-none"
            />
            <button
              onClick={handleBid}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold cursor-pointer"
            >
              Bid
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BidCard;