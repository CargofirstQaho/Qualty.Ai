import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";

export default function CustomerEnquiryDetailPage() {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [bid, setBid] = useState(null);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/customer/enquiry/${id}/details`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setEnquiry(data.enquiry);
          setBid(data.bid);
          setPayment(data.payment);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to load enquiry details");
      }
    };
    fetchDetails();
  }, [id]);

  if (!enquiry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1c1c1e] via-[#1a1a1c] to-[#121212] text-gray-400 text-lg">
        Loading inspection details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c1c1e] via-[#1a1a1c] to-[#121212] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2">
            Inspection Details
          </h1>
          <p className="text-gray-400 text-sm">
            Full breakdown of your confirmed inspection
          </p>
        </div>

        <div className="glass-card hover:shadow-blue-500/30">
          <h2 className="section-title">📋 Enquiry Info</h2>
          <div className="info-grid">
            <p>
              <strong>Category:</strong> {enquiry.commodityCategory}
            </p>
            <p>
              <strong>Location:</strong> {enquiry.inspectionLocation}
            </p>
            <p>
              <strong>Volume:</strong> {enquiry.volume}
            </p>
            <p>
              <strong>Status:</strong> {enquiry.status}
            </p>
          </div>
        </div>

        {bid ? (
          <div className="glass-card hover:shadow-green-500/30">
            <h2 className="section-title">✅ Confirmed Bid</h2>
            <div className="info-grid">
              <p>
                <strong>Inspector:</strong> {bid.inspector.name} (
                {bid.inspector.company})
              </p>
              <p>
                <strong>Bid Amount:</strong> ₹{bid.customerViewAmount}
              </p>
              <p>
                <strong>Note:</strong> {bid.note || "Inspector Note"}
              </p>
            </div>
          </div>
        ) : (
          <div className="glass-card animate-fade-in-slow text-center hover:shadow-yellow-500/30">
            <h2 className="section-title text-yellow-400">⚠️ No Bid Found</h2>
            <p className="text-sm text-gray-400">
              This enquiry hasn’t received any confirmed bids yet.
            </p>
          </div>
        )}

        {payment ? (
          <div className="glass-card hover:shadow-purple-500/30">
            <h2 className="section-title">💳 Payment Info</h2>
            <div className="info-grid">
              <p>
                <strong>Payment ID:</strong> {payment._id}
              </p>
              <p>
                <strong>Razorpay Order ID:</strong> {payment.razorpayOrderId}
              </p>
              <p>
                <strong>Razorpay Payment ID:</strong>{" "}
                {payment.razorpayPaymentId}
              </p>
              <p>
                <strong>Amount Paid:</strong> ₹{payment.amount}
              </p>
              <p>
                <strong>Status:</strong> {payment.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(payment.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="glass-card animate-fade-in-slow text-center hover:shadow-pink-500/30">
            <h2 className="section-title text-pink-400">🕒 No Payment Yet</h2>
            <p className="text-sm text-gray-400">
              You haven’t completed payment for this inspection.
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .glass-card {
          background: rgba(30, 30, 32, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid #2a2a2d;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          transition: box-shadow 0.3s ease;
        }
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #fff;
        }
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          font-size: 0.875rem;
          color: #ccc;
        }
      `}</style>
    </div>
  );
}