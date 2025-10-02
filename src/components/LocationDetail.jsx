import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LocationDetail = () => {
  const { regionName } = useParams();
  const decodedRegion = decodeURIComponent(regionName);
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const locationData = useSelector((state) => state.location?.data);
  const regionData = locationData?.[decodedRegion];
  

  const handleConfirmClick = (payload) => {
    if (user) {
      navigate("/quickInspection/form", { state: payload });
    } else {
      navigate("/login", {
        state: { redirectTo: "/quickInspection/form", payload },
      });
    }
  };

  if (!regionData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <p className="text-lg text-gray-400">
          No data found for{" "}
          <span className="text-white font-medium">{decodedRegion}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-white mb-6 transition-colors cursor-pointer"
        >
          ← Back to Regions
        </button>

        <h2 className="text-3xl font-bold text-center mb-8 border-b border-gray-700 pb-4">
          {decodedRegion} Locations
        </h2>

        <div className="space-y-6">
          {regionData.map((loc, index) => (
            <div
              key={loc.location || index}
              className="flex justify-between items-center bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-100">
                  {loc.location}
                </h3>
                <p className="text-sm text-gray-400">Estimated Rate</p>
                <p className="text-xl font-light text-green-400">
                  ₹{loc.price}
                </p>
              </div>
              <button
                onClick={() =>
                  handleConfirmClick({
                    location: loc.location,
                    rate: loc.price,
                    type: "domestic",
                  })
                }
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                Confirm
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;