import React, { useState } from "react";
import { User, Mail, Phone, MapPin, FileText, Camera } from "lucide-react";
import { BASE_URL } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [tradeLicenseFile, setTradeLicenseFile] = useState(null);
  const [importExportFile, setImportExportFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const user = useSelector(store=>store?.user.user)
  const  navigate = useNavigate()

  if (!user) {
     navigate("/login")
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-slate-300 text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  const { name, email, mobileNumber, address, profilePhoto, documents } = user;

  const handleUpload = async () => {
    if (!tradeLicenseFile && !importExportFile) return;

    const formData = new FormData();
    if (tradeLicenseFile) formData.append("tradeLicense", tradeLicenseFile);
    if (importExportFile) formData.append("importExportCertificate", importExportFile);

    try {
      setUploading(true);
      const response = await fetch(`${BASE_URL}/customer/profile/updateDocuments`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if(data.success){
        toast.success(data.message);

      }
      
    } catch (error) {
      ("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text ">
            My Account
          </h2>
          <p className="text-slate-400">Manage your profile information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-xl transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-slate-400 border-4 border-slate-500 shadow-xl group-hover:shadow-blue-500/20 transition-all duration-300">
                    <Camera size={48} />
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-400 font-medium">Profile Photo</p>
            </div>

            {/* Basic Info */}
            <div className="space-y-6">
              <InfoBlock icon={<User className="text-blue-400" size={20} />} label="Name" value={name} />
              <InfoBlock icon={<Mail className="text-green-400" size={20} />} label="Email" value={email} />
              <InfoBlock icon={<Phone className="text-purple-400" size={20} />} label="Phone Number" value={mobileNumber} />
              <InfoBlock icon={<MapPin className="text-orange-400" size={20} />} label="Address" value={address} multiline />
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center space-x-3 mb-8">
            <FileText className="text-blue-400" size={28} />
            <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Certificates
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Trade License */}
            <CertificateBlock
              label="Trade License"
              iconColor="text-blue-400"
              image={documents?.tradeLicense}
              onFileChange={(file) => setTradeLicenseFile(file)}
            />

            {/* Import/Export Certificate */}
            <CertificateBlock
              label="Import/Export Certificate"
              iconColor="text-green-400"
              image={documents?.importExportCertificate}
              onFileChange={(file) => setImportExportFile(file)}
            />
          </div>

          {/* Upload Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Update Certificates"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Info Block
const InfoBlock = ({ icon, label, value, multiline }) => (
  <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30 hover:border-blue-500/50 transition-all duration-200">
    <div className="flex items-center space-x-3 mb-2">
      {icon}
      <label className="block text-sm text-slate-400 font-medium">{label}</label>
    </div>
    <p className={`text-white font-semibold text-lg ml-8 ${multiline ? "whitespace-pre-line leading-relaxed" : ""}`}>
      {value}
    </p>
  </div>
);

// Reusable Certificate Block
const CertificateBlock = ({ label, iconColor, image, onFileChange }) => (
  <div className="group">
    <label className="block text-lg font-semibold text-white mb-4 flex items-center space-x-2">
      <FileText className={iconColor} size={20} />
      <span>{label}</span>
    </label>
    <div className={`bg-slate-700/30 rounded-xl border border-slate-600/30 overflow-hidden hover:border-blue-500/50 transition-all duration-300`}>
      {image ? (
        <img src={image} alt={label} className="w-full h-64 object-contain hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-3">
          <FileText size={48} className="text-slate-600" />
          <p className="font-medium">No {label.toLowerCase()} uploaded</p>
        </div>
      )}
    </div>
    <div className="mt-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onFileChange(e.target.files[0])}
        className="text-sm text-slate-300 file:bg-blue-600 file:text-white file:px-4 file:py-1 file:rounded file:border-none file:cursor-pointer"
      />
    </div>
  </div>
);

export default MyAccount;