import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import { toast } from "react-toastify";
import { FaUserCircle, FaClipboardList, FaMoneyBillWave, FaChartPie } from "react-icons/fa";

export default function DetailAnalysis() {
  const [customer, setCustomer] = useState(null);
  const [stats, setStats] = useState(null);
  const [animatedCompletion, setAnimatedCompletion] = useState(0);
  const [animatedPaymentSuccess, setAnimatedPaymentSuccess] = useState(0);

  useEffect(() => {
    const fetchCustomerStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/customer/analysis`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setCustomer(data.customer);
          setStats(data.stats);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to load customer analysis");
      }
    };
    fetchCustomerStats();
  }, []);

  useEffect(() => {
    if (stats) {
      let completion = 0;
      let payment = 0;

      const completionInterval = setInterval(() => {
        completion += 1;
        setAnimatedCompletion(completion);
        if (completion >= stats.completionRate) clearInterval(completionInterval);
      }, 10);

      const paymentInterval = setInterval(() => {
        payment += 1;
        setAnimatedPaymentSuccess(payment);
        if (payment >= stats.paymentSuccessRate) clearInterval(paymentInterval);
      }, 10);

      return () => {
        clearInterval(completionInterval);
        clearInterval(paymentInterval);
      };
    }
  }, [stats]);

  if (!customer || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f11] via-[#1a1a1c] to-[#121212] text-gray-400 text-lg">
        Loading customer analysis...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f11] via-[#1a1a1c] to-[#121212] text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-2 tracking-wide">
            Customer Overview
          </h1>
          <p className="text-gray-400 text-sm">Your inspection activity, payments, and performance insights</p>
        </div>

        {/* Profile Section */}
        <AnimatedCard glow="blue">
          <SectionTitle icon={<FaUserCircle />} title="Profile Info" />
          <InfoGrid data={{
            Name: customer.name,
            Email: customer.email,
            Mobile: customer.mobileNumber,
            Country: customer.country
          }} />
        </AnimatedCard>

        {/* Inspection Stats */}
        <AnimatedCard glow="green">
          <SectionTitle icon={<FaClipboardList />} title="Inspection Stats" />
          <InfoGrid data={{
            "Total Enquiries": stats.totalEnquiries,
            "Completed Inspections": stats.completedInspections,
            "Pending Inspections": stats.pendingInspections,
            "Completion Rate": `${stats.completionRate}%`
          }} />
          <ProgressBar label="Completion Progress" value={animatedCompletion} color="green" />
        </AnimatedCard>

        {/* Payment Stats */}
        <AnimatedCard glow="purple">
          <SectionTitle icon={<FaMoneyBillWave />} title="Payment Stats" />
          <InfoGrid data={{
            "Total Paid": `₹${stats.totalPaid}`,
            "Pending Payments": `₹${stats.pendingPayment}`,
            "Average Payment": `₹${stats.averagePayment}`,
            "Payment Success Rate": `${stats.paymentSuccessRate}%`
          }} />
          <ProgressBar label="Payment Success" value={animatedPaymentSuccess} color="purple" />
        </AnimatedCard>

        {/* Chart Placeholder */}
        <AnimatedCard glow="cyan" center>
          <SectionTitle icon={<FaChartPie />} title="Visual Analysis" />
          <p className="text-sm text-gray-400 mb-4">Charts and graphs coming soon to visualize your inspection trends.</p>
          <div className="h-40 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-gray-500 italic">
            [Chart Placeholder]
          </div>
        </AnimatedCard>
      </div>

      {/* Styling */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// 🔧 Reusable Components

function SectionTitle({ icon, title }) {
  return (
    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
  );
}

function InfoGrid({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
      {Object.entries(data).map(([label, value], i) => (
        <p key={i}><strong>{label}:</strong> {value}</p>
      ))}
    </div>
  );
}

function ProgressBar({ label, value, color }) {
  const colorMap = {
    green: "bg-green-500",
    purple: "bg-purple-500",
    cyan: "bg-cyan-500"
  };
  return (
    <div className="mt-4">
      <div className="text-sm text-gray-300 mb-1">{label}</div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <div
          className={`${colorMap[color]} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

function AnimatedCard({ children, glow, center = false }) {
  const glowMap = {
    blue: "hover:shadow-blue-500/30",
    green: "hover:shadow-green-500/30",
    purple: "hover:shadow-purple-500/30",
    cyan: "hover:shadow-cyan-500/30"
  };
  return (
    <div className={`bg-[#1e1e20] p-6 rounded-xl border border-[#2a2a2d] shadow-md transition-all duration-300 ${glowMap[glow]} ${center ? "text-center" : ""}`}>
      {children}
    </div>
  );
}