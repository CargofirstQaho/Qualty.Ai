import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";

export default function QuickRequestDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/quick-services/quick-requests/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setRequest(data.request);
        } else {
          setError(data.message || "Failed to load details");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;
  if (!request) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 sm:px-6 lg:px-10 py-10 text-white">
      <h2 className="text-4xl font-extrabold text-center mb-12 animate-fade-in tracking-wide">
        📄 Request Details
      </h2>

      <div className="max-w-3xl mx-auto bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-[0_0_30px_#22c55e] transition-all duration-300 animate-fade-in space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailItem label="📍 Location" value={request.location} />
          <DetailItem label="🗓️ Inspection Date" value={new Date(request.inspectionDate).toLocaleDateString()} />
          <DetailItem label="📦 Commodity Category" value={request.commodityCategory} />
          <DetailItem label="🧪 Volume" value={request.volume} />
          <DetailItem label="🔬 Inspection Type" value={request.inspectionTypes} />
          <DetailItem label="🛠️ Service" value={request.inspectionService} />
          <DetailItem label="📞 Contact" value={request.contact} />
          <DetailItem label="📌 Status" value={request.status} highlight="blue" />
          <DetailItem label="💰 Price" value={`₹${request.price}`} />
          {request.paymentId && <DetailItem label="💳 Payment ID" value={request.paymentId._id} />}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, highlight }) {
  return (
    <p className="text-sm sm:text-base text-gray-300">
      <span className="font-semibold text-gray-400">{label}:</span>{" "}
      <span className={`font-medium ${highlight ? `text-${highlight}-400` : "text-white"}`}>
        {value || "—"}
      </span>
    </p>
  );
}