import { useSelector } from "react-redux";
import useFetchCustomerEnquiry from "../../../hooks/useFetchCustomerEnquiry";
import CustomerHistoryCard from "./CustomerHistoryCard";

export default function CustomerMyHistoryPage() { 
  useFetchCustomerEnquiry();
  const enquiries = useSelector((state) => state.customerEnquiry.customerEnquiry);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">My Inspection History</h1>
          <p className="text-gray-400 text-sm">
            Track your past inspections, savings, and inspector details
          </p>
        </div>

        {enquiries && enquiries.length === 0 ? (
          <p className="text-center text-gray-400">No inspection history found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enquiries.map((e) => {
              const bid = e.confirmedBid;
              const formatted = {
                _id: e._id,
                title: e.title || "Inspection Request",
                status: e.status,
                category: e.commodityCategory || "N/A",
                location: e.inspectionLocation || "Unknown",
                date: e.createdAt,
                cost: e.inspectionBudget,
                bidClosed: bid?.customerViewAmount || 0,
                savings: e.inspectionBudget - (bid?.customerViewAmount || 0),
                inspector: bid?.inspector || null,
              };

              return (
                <CustomerHistoryCard
                  key={e._id}
                  enquiry={formatted}
                  onViewDetails={() => {}}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
