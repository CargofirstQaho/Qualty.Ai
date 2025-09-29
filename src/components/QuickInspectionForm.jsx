import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import useFetchUser from "../hooks/useFetchUser";

const QuickInspectionForm = ({ closeForm, onSubmit }) => {
  const [formData, setFormData] = useState({
    location: "",
    commodityCategory: "",
    description: "",
    inspectionDate: "",
    inspectionTypes: "",
    inspectionService: "",
    contact: "",
    volume: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useFetchUser();
  const { user } = useUser();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      location: formData.location,
      commodityCategory: formData.commodityCategory,
      description: formData.description,
      inspectionDate: formData.inspectionDate,
      inspectionTypes: formData.inspectionTypes,
      inspectionService: formData.inspectionService,
      contact: formData.contact,
      volume: formData.volume,
    };

    try {
      const response = await fetch(`${BASE_URL}/quick-services/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.errors?.[0]?.msg || data.message);
        // navigate('/login');
      }
    } catch (error) {
      ("Error submitting form:", error);
      setError(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-8 shadow-[0_0_60px_-15px_rgba(0,255,150,0.3)] border border-gray-800  mx-auto">
      <form
        onSubmit={handleFormSubmit}
        className="space-y-6 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-8 rounded-2xl shadow-[0_0_60px_-15px_rgba(0,255,150,0.3)] border border-gray-800 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Inspection Request
        </h2>

        {/* Location */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleFormChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none"
            placeholder="Enter location"
            required
          />
        </div>

        {/* Commodity Category */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Commodity Category
          </label>
          <select
            name="commodityCategory"
            value={formData.commodityCategory}
            onChange={handleFormChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none"
            required
          >
            <option value="">Select category</option>
            <option value="Rice">Rice</option>
            <option value="Grains">Grains</option>
            <option value="Pulses">Pulses</option>
            <option value="Wheat">Wheat</option>
            <option value="Maize">Maize</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none"
            rows="3"
            placeholder="Enter description"
          />
        </div>

        {/* Volume */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Volume
          </label>
          <input
            name="volume"
            value={formData.volume}
            onChange={handleFormChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none"
            placeholder="Enter volume"
          />
        </div>

        {/* Inspection Date */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Inspection Date
          </label>
          <input
            type="date"
            name="inspectionDate"
            value={formData.inspectionDate}
            onChange={handleFormChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none"
            required
          />
        </div>

        {/* Inspection Type */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Inspection Type
          </label>
          <div className="flex gap-6">
            {["Physical", "Chemical", "Both"].map((option) => (
              <label
                key={option}
                className="flex items-center text-sm text-gray-200"
              >
                <input
                  type="radio"
                  name="inspectionTypes"
                  value={option}
                  checked={formData.inspectionTypes === option}
                  onChange={handleFormChange}
                  className="mr-2 accent-green-500"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Inspection Service */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Inspection Service
          </label>
          <select
            name="inspectionService"
            value={formData.inspectionService}
            onChange={handleFormChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none"
            required
          >
            <option value="">Select service</option>
            <option value="PSI">PSI</option>
            <option value="Loading">Loading</option>
            <option value="Stuffing">Stuffing</option>
          </select>
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-300">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleFormChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-green-500 focus:outline-none"
            placeholder="Phone or Email"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={closeForm}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickInspectionForm;