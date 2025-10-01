import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useFetchUser from "../../../hooks/useFetchUser";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaGavel,
  FaComments,
  FaUserCircle,
  FaChartLine,
  FaHeadset,
  FaUser,
  FaHistory,
  FaMoneyBillWave,
  FaQuestionCircle,
} from "react-icons/fa";
import { BASE_URL } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const navItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/inspector/dashboard" },
  { label: "Bidding Room", icon: <FaGavel />, path: "/inspector/bidding" },
  { label: "Bid History", icon: <FaHistory />, path: "/inspector/history" },
  { label: "Payments", icon: <FaMoneyBillWave />, path: "/inspector/payments" },
  { label: "Detail Analysis", icon: <FaChartLine />, path: "/inspector/analysis" },
  { label: "My Account", icon: <FaUser />, path: "/inspector/account" },
  { label: "Chat with Us", icon: <FaComments />, path: "/inspector/chat" },
];

const InspectorLayout = () => {
  useFetchUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);

  const currentTab = navItems.find((item) =>
    location.pathname.includes(item.path)
  )?.label;

  const confirmLogoutAction = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      toast.error("Logout failed");
    }
    navigate("/");
  };

  if (!user) {
    navigate("/login");
    return <div className="text-center py-10 text-gray-400">Loading user details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-gray-900 border-r border-gray-700 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex gap-2 items-center">
            <FaUserCircle className="text-white text-2xl" />
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg transition-all ${
                location.pathname.includes(item.path)
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 rounded-lg text-left text-red-500 hover:bg-red-100 hover:text-red-700"
          >
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <nav className="bg-gray-900 border-b border-gray-700 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden mr-4 text-gray-300 hover:text-white"
            >
              <FaBars />
            </button>
            <h1 className="text-xl font-semibold">{currentTab || "Dashboard"}</h1>
          </div>
        </nav>

        <main className="p-6 bg-gray-900 min-h-screen">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 w-full max-w-sm text-center shadow-xl animate-fade-in">
            <h2 className="text-lg font-semibold text-white mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  confirmLogoutAction();
                  setShowLogoutConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold cursor-pointer"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold cursor-pointer"
              >
                No, Stay
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InspectorLayout;