import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaUserTie,
  FaChartBar,
  FaCheckCircle,
} from "react-icons/fa";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addInspectionBids,
  addInspectionStats,
} from "../../../redux/slice/enquiryBidSlice";
import { toast } from "react-toastify";

export default function InspectionDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { bids, stats } = useSelector((store) => store.enquiryBid);
  const [confirmedBidId, setConfirmedBidId] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customer/bids/${id}`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          dispatch(addInspectionBids(data.bids));
          dispatch(addInspectionStats(data.stats));
          const confirmed = data.bids.find((b) => b.status === "won");
          if (confirmed) setConfirmedBidId(confirmed._id);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to load inspection details");
      }
    };
    fetchDetails();
  }, [id]);

  const handleConfirmBid = async (bidId, enquiryId, amount) => {
    try {
      const orderRes = await fetch(
        `${BASE_URL}/payment/createOrder/${enquiryId}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );
      const orderData = await orderRes.json();

      if (!orderData.success) {
        toast.error(orderData.message || "Failed to create payment order");
        return;
      }

      const { order, customerDetails, paymentId, keyId } = orderData;

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Qualty.ai",
        description: "Confirm Bid Payment",
        order_id: order.id,
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.mobileNumber,
        },
        theme: {
          color: "#0f172a",
        },
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${BASE_URL}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                paymentId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                bidId,
              }),
            });

            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              toast.success("Bid confirmed successfully!");
              setConfirmedBidId(bidId);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Error verifying payment");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error("Error initiating payment");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">
            Inspection Bids Overview
          </h1>
          <p className="text-gray-400 text-sm">
            Review inspector bids and confirm the best fit for your inspection
          </p>
        </div>

        {stats && (
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center gap-2">
              <FaChartBar /> Bidding Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-300">
              <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition">
                <p className="text-lg font-bold text-white">
                  {stats.totalBids}
                </p>
                <p>Total Bids</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition">
                <p className="text-lg font-bold text-white">
                  ₹{stats.lowestBid}
                </p>
                <p>Lowest Bid</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition">
                <p className="text-lg font-bold text-white">
                  ₹{stats.highestBid}
                </p>
                <p>Highest Bid</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition">
                <p className="text-lg font-bold text-white">
                  ₹{Math.round(stats.averageBid)}
                </p>
                <p>Average Bid</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
            🧑‍🔬 Inspector Bids
          </h2>
          {bids.length === 0 ? (
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 text-center text-gray-400">
              <p className="text-lg font-semibold mb-2">No bids yet</p>
              <p className="text-sm">
                Once inspectors submit their bids, you'll be able to review and
                confirm them here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bids.map((bid) => {
                const isConfirmed = bid._id === confirmedBidId;
                const isLost = bid.status === "lost";
                const isWon = bid.status === "won";

                return (
                  <div
                    key={bid._id}
                    className={`bg-gray-900 p-6 rounded-xl border ${
                      isConfirmed ? "border-green-500" : "border-gray-700"
                    } shadow-lg hover:shadow-yellow-500/30 transition`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <FaUserTie className="text-yellow-400" />
                        {bid.inspector.name}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          isWon
                            ? "bg-green-600 text-white"
                            : isLost
                            ? "bg-red-600 text-white"
                            : "bg-gray-700 text-gray-300"
                        }`}
                      >
                        {bid.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1 mb-4">
                      <p>
                        <strong>Bid Amount:</strong> ₹{bid.customerViewAmount}/-
                      </p>
                      <p>
                        <strong>Submitted:</strong>{" "}
                        {new Date(bid.createdAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Enquiry ID:</strong> {bid.enquiry}
                      </p>
                    </div>
                    {isConfirmed ? (
                      <button
                        disabled
                        className="bg-green-700 text-white px-4 py-2 rounded font-semibold text-sm w-full cursor-not-allowed"
                      >
                        <FaCheckCircle className="inline mr-2" />
                        Confirmed
                      </button>
                    ) : confirmedBidId ? (
                      <button
                        disabled
                        className="bg-gray-700 text-gray-400 px-4 py-2 rounded font-semibold text-sm w-full cursor-not-allowed"
                      >
                        <FaCheckCircle className="inline mr-2" />
                        Not Selected
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleConfirmBid(
                            bid._id,
                            bid.enquiry,
                            bid.customerViewAmount
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold text-sm w-full cursor-pointer"
                      >
                        <FaCheckCircle className="inline mr-2" />
                        Confirm This Bid
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}