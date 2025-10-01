import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";

export default function CustomerPaymentHistoryPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${BASE_URL}/customer/payments`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setPayments(data.payments);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to load payment history");
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c1c1e] via-[#1a1a1c] to-[#121212] text-white px-6 py-10">

      <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold bg-clip-text text-blue-500 mb-2">
            Payment History
          </h1>
          <p className="text-gray-400 text-sm">Your completed transactions, beautifully displayed</p>
        </div>

        {payments.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-gray-700 text-center text-gray-400 shadow-inner animate-fade-in-slow">
            <p className="text-lg font-semibold mb-2">No payments found</p>
            <p className="text-sm">You haven’t completed any transactions yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {payments.map((p, index) => (
              <div
                key={p._id}
                className={`bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-gray-700 shadow-xl hover:shadow-blue-500/40 transition-all duration-300 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">₹{p.amount}/-</h3>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-600 text-white shadow-md">
                    {p.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-gray-300 space-y-2">
                  <p><strong>Payment ID:</strong> {p._id}</p>
                  <p><strong>Order ID:</strong> {p.razorpayOrderId}</p>
                  <p><strong>Enquiry:</strong> {p.enquiry?.commodityCategory} — {p.enquiry?.inspectionLocation}</p>
                  <p><strong>Date:</strong> {new Date(p.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.2s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}