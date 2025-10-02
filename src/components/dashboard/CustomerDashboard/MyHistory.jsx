import { useSelector } from "react-redux";
import useFetchCustomerEnquiry from "../../../hooks/useFetchCustomerEnquiry";
import CustomerHistoryCard from "./CustomerHistoryCard";

export default function CustomerMyHistoryPage() {
  useFetchCustomerEnquiry();
  const enquiries = useSelector((state) => state.customerEnquiry.customerEnquiry);  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c1c1e] via-[#1a1a1c] to-[#121212] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2">
            My Inspection History
          </h1>
          <p className="text-gray-400 text-sm">Track your past inspections, savings, and inspector details</p>
        </div>

        {enquiries && enquiries.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-gray-700 text-center text-gray-400 shadow-inner animate-fade-in-slow">
            <p className="text-lg font-semibold mb-2">No inspection history found</p>
            <p className="text-sm">Once you complete inspections, they’ll appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enquiries.map((e, index) => {
              const bid = e.confirmedBid;
              const formatted = {
                _id: e._id,
                title: e.commodityCategory ,
                status: e.status,
                category: e.subCommodity ,
                location: e.inspectionLocation ,
                date: e.createdAt,
                cost: e.inspectionBudget,
                bidClosed: bid?.customerViewAmount || 0,
                savings: e.inspectionBudget - (bid?.customerViewAmount || 0),
              };

              return (
                <div key={e._id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CustomerHistoryCard enquiry={formatted} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Animations */}
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