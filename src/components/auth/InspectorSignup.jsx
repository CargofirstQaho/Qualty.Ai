import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom"; 
import { toast } from 'react-toastify';

const allowedCommodities = [
  "Textiles & Garments",
  "Electronics & Electrical",
  "Automotive Parts",
  "Food & Beverages",
  "Pharmaceuticals",
  "Chemicals",
  "Machinery & Equipment",
  "Furniture & Wood Products",
  "Metals & Alloys",
  "Plastics & Rubber",
  "Agricultural Products",
  "Jewelry & Accessories",
  "Toys & Games",
  "Cosmetics & Personal Care",
  "Sports Equipment",
  "Other",
];

export default function InspectorSignup() {

  const [formData, setFormData] = useState({
    role: "inspector",
    inspectorType: "indian",
    name: "",
    email: "",
    password: "",
    countryCode: "+91",
    mobileNumber: "",
    address: "",
    acceptsRequests: false,
    identityDocuments: {
      aadhaarCard: null,
    },
    billingDetails: {
      accountNumber: "",
      bankName: "",
      ifscCode: "",
    },
    commodities: [{ commodity: "", experienceYears: 0 }],

  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name.startsWith("identityDocuments.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        identityDocuments: {
          ...prev.identityDocuments,
          [key]: files ? files[0] : value,
        },
      }));
    } else if (name.startsWith("billingDetails.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        billingDetails: {
          ...prev.billingDetails,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCommodityChange = (index, field, value) => {
    const updated = [...formData.commodities];
    updated[index][field] = field === "experienceYears" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, commodities: updated }));
  };

  const addCommodity = () => {
    setFormData((prev) => ({
      ...prev,
      commodities: [...prev.commodities, { commodity: "", experienceYears: 0 }],
    }));
  };

  const removeCommodity = (index) => {
    const updated = [...formData.commodities];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, commodities: updated }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

    if (
      formData.acceptsRequests &&
      (!formData.identityDocuments.aadhaarCard ||
        !formData.billingDetails.accountNumber ||
        !formData.billingDetails.bankName ||
        !formData.billingDetails.ifscCode)
    ) {
      setError("Please fill all required fields to accept requests.");
      return;
    }

    const formdataToSend = new FormData();
    formdataToSend.append("role", formData.role);
    formdataToSend.append("inspectorType", formData.inspectorType);
    formdataToSend.append("name", formData.name);
    formdataToSend.append("email", formData.email);
    formdataToSend.append("password", formData.password);
    formdataToSend.append("countryCode", formData.countryCode);
    formdataToSend.append("mobileNumber", formData.mobileNumber);
    formdataToSend.append("address", formData.address);
    formdataToSend.append("acceptsRequests", formData.acceptsRequests ? "true" : "false");

    if (formData.identityDocuments.aadhaarCard)
      formdataToSend.append(
        "aadhaarCard",
        formData.identityDocuments.aadhaarCard
      );

    formdataToSend.append(
      "accountNumber",
      formData.billingDetails.accountNumber
    );
    formdataToSend.append(
      "bankName",
      formData.billingDetails.bankName
    );
    formdataToSend.append(
      "ifscCode",
      formData.billingDetails.ifscCode
    );

    formData.commodities.forEach((item, index) => {
      formdataToSend.append(`commodities[${index}][commodity]`, item.commodity);
      formdataToSend.append(
        `commodities[${index}][experienceYears]`,
        item.experienceYears
      );
    });

    try {
      const response = await fetch(`${BASE_URL}/auth/signup/inspector`, {
        method: "POST",
        body: formdataToSend,
        credentials: "include",
      });
 
      const data = await response.json();
      if (!data.success) {
        setError(data.errors?.[0]?.msg || data.message);
      } else {
       toast.success(data.message || "Signup Successful")
        navigate("/login");
      }
    } catch (err) {
      ("Signup error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Inspector Signup</h2>
        <div>
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded"
          >
            <option value="customer">Customer</option>
            <option value="inspector">Inspector</option>
          </select>
        </div>

        <div>
          <label>Inspector Type</label>
          <select
            name="inspectorType"
            value={formData.inspectorType}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 text-white rounded"
          >
            <option value="indian">Indian</option>
            <option value="international">International</option>
          </select>
        </div>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded"
          required
        />
        <input
          name="countryCode"
          placeholder="Country Code"
          value={formData.countryCode}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded"
          required
        />
        <input
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 text-white rounded"
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="acceptsRequests"
            checked={formData.acceptsRequests}
            onChange={handleChange}
          />
          <label>Accepts Requests</label>
        </div>

        {formData.acceptsRequests && (
          <>
            <input
              type="file"
              name="identityDocuments.aadhaarCard"
              onChange={handleChange}
              placeholder="Aadhaar Card"
              required
            />
            <input
              name="billingDetails.accountNumber"
              value={formData.billingDetails.accountNumber}
              onChange={handleChange}
              placeholder="Account Number"
              required
            />
            <input
              name="billingDetails.bankName"
              value={formData.billingDetails.bankName}
              onChange={handleChange}
              placeholder="Bank Name"
              required
            />
            <input
              name="billingDetails.ifscCode"
              value={formData.billingDetails.ifscCode}
              onChange={handleChange}
              placeholder="IFSC Code"
              required
            />
          </>
        )}

        <div>
          <h3 className="font-semibold">Commodities</h3>
          {formData.commodities.map((item, index) => (
            <div key={index} className="space-y-2 mb-4">
              <select
                value={item.commodity}
                onChange={(e) =>
                  handleCommodityChange(index, "commodity", e.target.value)
                }
                className="w-full p-2 bg-gray-800 text-white rounded"
              >
                <option value="">Select Commodity</option>
                {allowedCommodities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                max="50"
                value={item.experienceYears}
                onChange={(e) =>
                  handleCommodityChange(
                    index,
                    "experienceYears",
                    e.target.value
                  )
                }
                placeholder="Years of Experience"
                className="w-full p-2 bg-gray-800 text-white rounded"
                required
              />
              {formData.commodities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCommodity(index)}
                  className="bg-red-600 px-2 py-1 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCommodity}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Commodity
          </button>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <button
          type="submit"
          className="w-full bg-green-600 py-2 rounded hover:bg-green-700 font-semibold cursor-pointer"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}