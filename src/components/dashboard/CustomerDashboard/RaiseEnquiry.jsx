import React, { useState } from "react";
import { X, FileText, CheckCircle } from 'lucide-react';
import { BASE_URL } from "../../../utils/constants";
import useFetchUser from "../../../hooks/useFetchUser"
import { toast } from "react-toastify"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addEnquiries } from "../../../redux/slice/enquirySlice";

const commodityData = {
  "Food & Beverages": {
    Rice: ["Basmati Rice", "Jasmine Rice", "Brown Rice", "White Rice"],
    Wheat: ["Wheat Flour", "Whole Wheat", "Durum Wheat"],
    Pulses: ["Lentils", "Chickpeas", "Black Beans"],
  },
  "Textiles & Garments": {
    Cotton: ["Organic Cotton", "Conventional Cotton"],
    Silk: ["Mulberry Silk", "Tussar Silk"],
  },
  Electronics: {
    Devices: ["Smartphones", "Laptops"],
    Components: ["Resistors", "Capacitors"],
  },
  Other: {},
};

const units = [
  "Kg", "Tons", "Pieces", "Cartons", "Pallets", "Containers", "Liters", "Cubic Meters"
];

const additionalServicesOptions = [
  "Pre-Shipment Inspection",
  "Loading Truck",
  "Stuffing Container",
];

const certificationOptions = [
  {
    value: "NABL",
    label: "NABL",
    description:
      "National Accreditation Board for Testing and Calibration Laboratories",
  },
  {
    value: "NABCB",
    label: "NABCB",
    description: "National Accreditation Board for Certification Bodies",
  },
  { value: "COC", label: "COC", description: "Certificate of Conformity" },
  {
    value: "FOSFE",
    label: "FOSFE",
    description: "Federation of Seed & Farm Equipment",
  },
  {
    value: "GAFTA",
    label: "GAFTA",
    description: "Grain and Feed Trade Association",
  },
  {
    value: "ISO",
    label: "ISO",
    description: "International Organization for Standardization",
  },
];

const RaiseEnquiry = () => {
  useFetchUser()
  const user = useSelector(store => store?.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const inputClass =
    "w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const [formData, setFormData] = useState({
    inspectionLocation: "",
    country: "",
    urgencyLevel: "",
    commodityCategory: "",
    subCommodity: "",
    specificCommodity: "",
    volume: "",
    unit: "",
    inspectionDateFrom: "",
    inspectionDateTo: "",
    inspectionTypes: [],
    physicalParameters: "",
    chemicalParameters: "",
    additionalServices: "",
    certifications: "",
    companyEmail: "",
    companyPhoneNumber: "",
    specialRequirements: "",
    description: "",
    inspectionBudget: "",
    role: user?.role,
  });

  const [ricePhysicalParams, setRicePhysicalParams] = useState({
    broken: 0,
    yellowKernel: 0,
    redKernel: 0,
    chalkyRice: 0,
    millingDegree: '',
    purity: 0,
    damageKernel: 0,
    paddyKernel: 0,
    liveInsects: '',
    averageGrainLength: 0,
  });

  const [modalState, setModalState] = useState({
    ricePhysical: false,
    genericPhysical: false,
    genericChemical: false,
  });

  const [tempGenericParams, setTempGenericParams] = useState({
    physical: "",
    chemical: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Open appropriate parameter modal based on commodity and inspection type
      if (formData.subCommodity === "Rice" && value === "Physical") {
        setModalState(prev => ({ ...prev, ricePhysical: true }));
      } else if (value === "Physical") {
        setModalState(prev => ({ ...prev, genericPhysical: true }));
      } else if (value === "Chemical") {
        setModalState(prev => ({ ...prev, genericChemical: true }));
      }
    }

    setFormData((prev) => {
      const updated = checked
        ? [...prev.inspectionTypes, value]
        : prev.inspectionTypes.filter((type) => type !== value);
      return { ...prev, inspectionTypes: updated };
    });
  };

  const handleRiceParamChange = (e) => {
    const { name, value } = e.target;
    setRicePhysicalParams(prev => ({
      ...prev,
      [name]: ['millingDegree', 'liveInsects'].includes(name) ? value : parseFloat(value) || 0
    }));
  };

  const handleGenericParamChange = (type, value) => {
    setTempGenericParams(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const saveRiceParameters = () => {
    const paramString = Object.entries(ricePhysicalParams)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    setFormData(prev => ({ ...prev, physicalParameters: paramString }));
    setModalState(prev => ({ ...prev, ricePhysical: false }));
  };

  const saveGenericParameters = (type) => {
    if (type === 'physical') {
      setFormData(prev => ({ ...prev, physicalParameters: tempGenericParams.physical }));
      setModalState(prev => ({ ...prev, genericPhysical: false }));
    } else if (type === 'chemical') {
      setFormData(prev => ({ ...prev, chemicalParameters: tempGenericParams.chemical }));
      setModalState(prev => ({ ...prev, genericChemical: false }));
    }
  };

  const closeModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      inspectionLocation: formData.inspectionLocation,
      country: formData.country,
      urgencyLevel: formData.urgencyLevel,
      commodityCategory: formData.commodityCategory,
      subCommodity: formData.subCommodity,
      volume: formData.volume,
      inspectionBudget: Number(formData.inspectionBudget) || 0,

      inspectionDate: {
        from: formData.inspectionDateFrom || null,
        to: formData.inspectionDateTo || null,
      },

      inspectionTypes: {
        physical: formData.inspectionTypes.includes("Physical"),
        chemical: formData.inspectionTypes.includes("Chemical"),
      },

      physicalParameters:
        formData.subCommodity === "Rice" ? ricePhysicalParams : {},

      chemicalParameters: formData.chemicalParameters
        ? [formData.chemicalParameters]
        : [],

      additionalServices: formData.additionalServices
        ? [formData.additionalServices]
        : [],

      certifications: formData.certifications
        ? [formData.certifications]
        : [],

      contact: {
        email: formData.companyEmail,
        phoneNumber: formData.companyPhoneNumber,
      },

      specialRequirements: formData.specialRequirements,
      description: formData.description,
    };

    try {
      const response = await fetch(`${BASE_URL}/customer/raise-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
        credentials: "include",
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to submit enquiry");
      } else {
        dispatch(addEnquiries(data.enquiry))
        toast.success(data.message || "Enquiry submitted successfully");
        setError("");
        setFormData({
          inspectionLocation: "",
          country: "",
          urgencyLevel: "",
          commodityCategory: "",
          subCommodity: "",
          specificCommodity: "",
          volume: "",
          unit: "",
          inspectionDateFrom: "",
          inspectionDateTo: "",
          inspectionTypes: [],
          physicalParameters: "",
          chemicalParameters: "",
          additionalServices: "",
          certifications: "",
          companyEmail: "",
          companyPhoneNumber: "",
          specialRequirements: "",
          description: "",
          inspectionBudget: "",
          role: user?.role,
        });
        navigate("/customer/bidding")
      }
    } catch (error) {
      ("Error submitting enquiry:", error);
    }
  };

  const categoryOptions = Object.keys(commodityData);
  const subCategoryOptions = formData.commodityCategory
    ? Object.keys(commodityData[formData.commodityCategory] || {})
    : [];
  const specificOptions =
    formData.subCommodity &&
      commodityData[formData.commodityCategory]?.[formData.subCommodity]
      ? commodityData[formData.commodityCategory][formData.subCommodity]
      : [];

  const hasPhysicalParams = formData.physicalParameters;
  const hasChemicalParams = formData.chemicalParameters;


  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Raise Inspection Enquiry</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location & Timing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="inspectionLocation"
              placeholder="Inspection Location"
              value={formData.inspectionLocation}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className={inputClass}
            />
            <select
              name="urgencyLevel"
              value={formData.urgencyLevel}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Urgency Level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Inspection Types</label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Physical"
                    checked={formData.inspectionTypes.includes("Physical")}
                    onChange={handleCheckboxChange}
                    className="form-checkbox text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  />
                  <span className="flex items-center gap-1">
                    Physical
                    {hasPhysicalParams && <CheckCircle size={16} className="text-green-500" />}
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="Chemical"
                    checked={formData.inspectionTypes.includes("Chemical")}
                    onChange={handleCheckboxChange}
                    className="form-checkbox text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
                  />
                  <span className="flex items-center gap-1">
                    Chemical
                    {hasChemicalParams && <CheckCircle size={16} className="text-green-500" />}
                  </span>
                </label>
              </div>
            </div>
            <input
              name="inspectionDateFrom"
              type="date"
              value={formData.inspectionDateFrom}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="inspectionDateTo"
              type="date"
              value={formData.inspectionDateTo}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Commodity Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="commodityCategory"
              value={formData.commodityCategory}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Commodity Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              name="subCommodity"
              value={formData.subCommodity}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Sub Commodity</option>
              {subCategoryOptions.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>

            <select
              name="specificCommodity"
              value={formData.specificCommodity}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Specific Commodity</option>
              {specificOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <input
              name="inspectionBudget"
              placeholder="Inspection Budget"
              value={formData.inspectionBudget}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="volume"
              placeholder="Volume"
              value={formData.volume}
              onChange={handleChange}
              className={inputClass}
            />
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Unit</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          {(hasPhysicalParams || hasChemicalParams) && (
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText size={20} />
                Selected Parameters
              </h3>
              {hasPhysicalParams && (
                <div className="mb-3">
                  <h4 className="font-medium text-blue-300 mb-1">Physical Parameters:</h4>
                  <p className="text-sm text-gray-300">
                    {formData.subCommodity === "Rice" ? "Detailed rice physical parameters configured" : formData.physicalParameters}
                  </p>
                </div>
              )}
              {hasChemicalParams && (
                <div>
                  <h4 className="font-medium text-green-300 mb-1">Chemical Parameters:</h4>
                  <p className="text-sm text-gray-300">{formData.chemicalParameters}</p>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="additionalServices"
              value={formData.additionalServices}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Additional Services</option>
              {additionalServicesOptions.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <select
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Certifications Required</option>
              {certificationOptions.map((cert) => (
                <option key={cert.value} value={cert.value} title={cert.description}>
                  {cert.label} - {cert.description}
                </option>
              ))}
            </select>
          </div>

          {/* Company Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="companyEmail"
              type="email"
              placeholder="Company Email"
              value={formData.companyEmail}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="companyPhoneNumber"
              placeholder="Company Phone Number"
              value={formData.companyPhoneNumber}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Special Requirements & Description */}
          <textarea
            name="specialRequirements"
            placeholder="Special Requirements"
            value={formData.specialRequirements}
            onChange={handleChange}
            rows={3}
            className={inputClass}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={inputClass}
          />

          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

          {/* Submit */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all transform hover:scale-105"
            >
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>

      {/* Rice Parameters Modal */}
      {modalState.ricePhysical && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Rice Physical Parameters</h3>
              <button
                onClick={() => closeModal('ricePhysical')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Broken (%)
                  </label>
                  <input
                    type="number"
                    name="broken"
                    value={ricePhysicalParams.broken}
                    onChange={handleRiceParamChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="100"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Yellow Kernel (%)
                  </label>
                  <input
                    type="number"
                    name="yellowKernel"
                    value={ricePhysicalParams.yellowKernel}
                    onChange={handleRiceParamChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="100"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Red Kernel (%)
                  </label>
                  <input
                    type="number"
                    name="redKernel"
                    value={ricePhysicalParams.redKernel}
                    onChange={handleRiceParamChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="100"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Chalky Rice (%)
                  </label>
                  <input
                    type="number"
                    name="chalkyRice"
                    value={ricePhysicalParams.chalkyRice}
                    onChange={handleRiceParamChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="100"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Milling Degree
                  </label>
                  <select
                    name="millingDegree"
                    value={ricePhysicalParams.millingDegree}
                    onChange={handleRiceParamChange}
                    className={inputClass}
                  >
                    <option value="">Select Milling Degree</option>
                    <option value="Well Milled">Well Milled</option>
                    <option value="Reasonably Well Milled">Reasonably Well Milled</option>
                    <option value="Lightly Milled">Lightly Milled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Purity (%)
                  </label>
                  <input
                    type="number"
                    name="purity"
                    value={ricePhysicalParams.purity}
                    onChange={handleRiceParamChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="100"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Damage Kernel (%)
                  </label>
                  <input
                    type="number"
                    name="damageKernel"
                    value={ricePhysicalParams.damageKernel}
                    onChange={handleRiceParamChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="100"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Paddy Kernel (%)
                  </label>
                  <input
                    type="number"
                    name="paddyKernel"
                    value={ricePhysicalParams.paddyKernel}
                    onChange={handleRiceParamChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="100"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Live Insects
                  </label>
                  <select
                    name="liveInsects"
                    value={ricePhysicalParams.liveInsects}
                    onChange={handleRiceParamChange}
                    className={inputClass}
                  >
                    <option value="">Select Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Average Grain Length (mm)
                  </label>
                  <input
                    type="number"
                    name="averageGrainLength"
                    value={ricePhysicalParams.averageGrainLength}
                    onChange={handleRiceParamChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
              <button
                onClick={() => closeModal('ricePhysical')}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveRiceParameters}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Save Parameters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generic Physical Parameters Modal */}
      {modalState.genericPhysical && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Physical Parameters</h3>
              <button
                onClick={() => closeModal('genericPhysical')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <textarea
                value={tempGenericParams.physical}
                onChange={(e) => handleGenericParamChange('physical', e.target.value)}
                placeholder="Specify the physical parameters you need tested (e.g., dimensions, weight, texture, appearance, moisture content, etc.)"
                rows={8}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-sm text-gray-400 mt-2">
                Specify your requirements in detail, including testing standards, acceptable limits, and any specific methodologies.
              </p>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
              <button
                onClick={() => closeModal('genericPhysical')}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => saveGenericParameters('physical')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Save Parameters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generic Chemical Parameters Modal */}
      {modalState.genericChemical && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">Chemical Parameters</h3>
              <button
                onClick={() => closeModal('genericChemical')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <textarea
                value={tempGenericParams.chemical}
                onChange={(e) => handleGenericParamChange('chemical', e.target.value)}
                placeholder="Specify the chemical parameters you need tested (e.g., pH levels, composition analysis, contaminant testing, nutritional content, etc.)"
                rows={8}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-sm text-gray-400 mt-2">
                Specify your requirements in detail, including testing standards, acceptable limits, and any specific methodologies.
              </p>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
              <button
                onClick={() => closeModal('genericChemical')}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => saveGenericParameters('chemical')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Save Parameters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaiseEnquiry;