import React, { useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import {useDispatch} from "react-redux"
import {addPlaceBid} from "../../../redux/slice/bidSlice"
import { toast } from "react-toastify";

const BidCard = ({ bid }) => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch()

  const {
    _id: id,
    inspectionLocation: location,
    urgencyLevel: urgency,
    inspectionBudget: budget,
    commodityCategory: commodity,
    subCommodity,
    volume,
    inspectionDate,
    inspectionTypes,
    contact,
    additionalServices,
    certifications,
    description,
  } = bid;

  const handleBid = async (id) => {
    const bidAmount = Number(amount);
    if (!bidAmount || bidAmount <= 0) return alert("Enter a valid bid amount");

    try {
      const response = await fetch(`${BASE_URL}/inspector/bid/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ amount:bidAmount }),
      });

      const data = await response.json();
      if (data.success) {
        dispatch(addPlaceBid(data.bid))
        toast.success(data.message)
      } else {
        toast.success(data.message)
      }
    } catch (err) {
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 m-5 flex justify-around shadow-lg hover:shadow-blue-500/50">
      <div className="mb-2 space-y-1">
        <p className="text-md font-semibold text-gray-400">
          Commodity: <span className="text-gray-100">{commodity}</span>{" "}
        </p>
        <p className="text-md font-semibold text-gray-400">
          SubCommodity: <span className="text-gray-100">{subCommodity}</span>
        </p>
        <p className="text-md font-semibold text-gray-400">
          Location: <span className="text-gray-100">{location}</span>
        </p>
        <p className="text-md font-semibold text-gray-400">
          Urgency:{" "}
          <span
            className={`font-semibold ${
              urgency === "High" ? "text-red-500" : "text-yellow-400"
            }`}
          >
            {urgency}
          </span>
        </p>
        <p className="text-md font-semibold text-gray-400">
          Budget:{" "}
          <span className="font-semibold text-green-400">₹{budget}/-</span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="₹ Enter bid amount"
          className="bg-gray-700 text-white px-3 py-2 rounded w-full outline-none"
        />
        <button
          onClick={()=>handleBid(id)}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold cursor-pointer"
        >
          Bid
        </button>
      </div>
    </div>
  );
};


export default BidCard;