import React, { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Move component functions outside to prevent recreation on each render
function Input({ name, label, type = "text", placeholder, formData, handleChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-gray-800/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
}

function StaticInput({ label, value }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <input
        type="text"
        value={value}
        disabled
        className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
      />
    </div>
  );
}

function Select({ name, label, options, formData, handleChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="bg-gray-800/80 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({ name, label, formData, handleChange }) {
  return (
    <div className="flex flex-col col-span-full space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <textarea
        name={name}
        value={formData[name]}
        onChange={handleChange}
        rows={4}
        className="bg-gray-800/80 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
      />
    </div>
  );
}

function FileInput({ name, label, handleChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <input
        type="file"
        name={name}
        onChange={handleChange}
        className="bg-gray-800/80 border border-gray-600 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer transition-all duration-200"
      />
    </div>
  );
}

const CompanySignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: "inspection company",
    companyType: "",
    contactPersonName: "",
    companyEmail: "",
    password: "",
    countryCode: "",
    companyPhoneNumber: "",
    mobileNumber: "",
    companyName: "",
    businessLicenseNumber: "",
    companyAddress: "",
    website: "",
    yearEstablished: "",
    employeeCount: "",
    servicesOffered: "",
    gstNumber: "",
    panNumber: "",
    cinNumber: "",
    msmeNumber: "",
    documents: {
      businessLicense: null,
      incorporationCertificate: null,
      taxCertificate: null,
      insuranceDocument: null,
    },
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name.startsWith("documents.")) {
      const docKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [docKey]: files[0],
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//   if (key === "documents") {
//     Object.entries(formData.documents).forEach(([docKey, file]) => {
//       if (file) payload.append(docKey, file);
//     });
//   } else {
//     // 🔧 Fix: convert servicesOffered to string explicitly
//     payload.append(key, key === "servicesOffered" ? String(value) : value);
//   }
// });


//       const res = await fetch(`${BASE_URL}/auth/signup/inspectionCompany`, {
//         method: "POST",
//         body: payload,
//       });

//       const data = await res.json();
//       console.log(data)

//       if (data.ok) {
//         toast.success("Signup successful!");
//         navigate("/login");
//       } else {
//         toast.error(data.errors?.[0]?.msg || data.message);
//         console.log(data.message)
//       }
//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   };


const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Auto-prefix website if missing protocol
  if (formData.website && !formData.website.startsWith("http")) {
    formData.website = "https://" + formData.website;
  }

  // ✅ Validate website format
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (formData.website && !isValidURL(formData.website)) {
    toast.error("Please enter a valid website URL (e.g., https://example.com)");
    return;
  }

  try {
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "documents") {
        Object.entries(value).forEach(([docKey, file]) => {
          if (file) payload.append(docKey, file); // ✅ flat keys
        });
      } else {
        // ✅ Normalize servicesOffered to string
        if (key === "servicesOffered") {
          const normalized = Array.isArray(value) ? value.join(", ") : String(value);
          payload.append("servicesOffered", normalized);
        } else {
          payload.append(key, typeof value === "string" ? value : String(value));
        }
      }
    });

    const res = await fetch(`${BASE_URL}/auth/signup/inspectionCompany`, {
      method: "POST",
      body: payload,
    });

    const data = await res.json();
    console.log(data);

    if (data.ok) {
      toast.success("Signup successful!");
      navigate("/login");
    } else {
      toast.error(data.errors?.[0]?.msg || data.message);
      console.log(data.message);
    }
  } catch (err) {
    toast.error("Something went wrong");
    console.error("Signup error:", err.message);
  }
};

  const isIndian = formData.companyType === "indian";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Inspection Company Signup
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaticInput label="Role" value="inspection company" />
            <Select name="companyType" label="Company Type" options={["indian", "international"]} formData={formData} handleChange={handleChange} />
            <Input name="contactPersonName" label="Contact Person Name" formData={formData} handleChange={handleChange} />
            <Input name="companyEmail" label="Company Email" type="email" formData={formData} handleChange={handleChange} />
            <Input name="password" label="Password" type="password" formData={formData} handleChange={handleChange} />
            <Input name="countryCode" label="Country Code" placeholder="+91" formData={formData} handleChange={handleChange} />
            <Input name="companyPhoneNumber" label="Company Phone Number" formData={formData} handleChange={handleChange} />
            <Input name="mobileNumber" label="Mobile Number" formData={formData} handleChange={handleChange} />
            <Input name="companyName" label="Company Name" formData={formData} handleChange={handleChange} />
            <Input name="businessLicenseNumber" label="Business License Number" formData={formData} handleChange={handleChange} />
            <Input name="companyAddress" label="Company Address" formData={formData} handleChange={handleChange} />
            <Input name="website" label="Website" formData={formData} handleChange={handleChange} />
            <Input name="yearEstablished" label="Year Established" type="number" formData={formData} handleChange={handleChange} />
            <Select
              name="employeeCount"
              label="Employee Count"
              options={["1-10", "11-50", "51-100", "101-500", "501-1000"]}
              formData={formData}
              handleChange={handleChange}
            />
            <TextArea name="servicesOffered" label="Services Offered" formData={formData} handleChange={handleChange} />

            {isIndian && (
              <>
                <Input name="gstNumber" label="GST Number" formData={formData} handleChange={handleChange} />
                <Input name="panNumber" label="PAN Number" formData={formData} handleChange={handleChange} />
                <Input name="cinNumber" label="CIN Number" formData={formData} handleChange={handleChange} />
              </>
            )}

            <Input name="msmeNumber" label="MSME Number" formData={formData} handleChange={handleChange} />
            <FileInput name="documents.businessLicense" label="Business License" handleChange={handleChange} />
            <FileInput name="documents.incorporationCertificate" label="Incorporation Certificate" handleChange={handleChange} />
            <FileInput name="documents.taxCertificate" label="Tax Certificate (optional)" handleChange={handleChange} />
            <FileInput name="documents.insuranceDocument" label="Insurance Document" handleChange={handleChange} />
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 px-6 rounded-lg text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanySignup;