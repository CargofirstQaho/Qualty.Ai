import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { Link } from "react-router-dom"; // ✅ Correct import

export default function QuickRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${BASE_URL}/quick-services/quick-requests`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setRequests(data.requests);
        } else {
          setError(data.message || "Failed to load requests");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 sm:px-6 lg:px-10 py-10 text-white">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 animate-fade-in">
        📂 My Quick Requests
      </h2>

      {loading ? (
        <p className="text-center text-gray-400 animate-pulse">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-400 animate-fade-in">
          <p className="text-lg sm:text-xl">
            You haven’t raised any quick services yet.
          </p>
          <p className="text-sm mt-2">Start a new inspection to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto animate-fade-in">
          {requests.map((req) => (
            <Link key={req._id} to={`/customer/quick-requests/${req._id}`}>
              <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-xl p-5 shadow-md hover:shadow-[0_0_20px_#22c55e] transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-green-400 tracking-wide">
                    {req.location}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-1">
                  🗓️ Inspection Date:{" "}
                  <span className="text-white font-medium">
                    {new Date(req.inspectionDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  📌 Status:{" "}
                  <span className="text-blue-400 font-semibold uppercase">
                    {req.status}
                  </span>
                </p>
               
                <p className="text-sm text-gray-300">💰 Price: ₹{req.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}