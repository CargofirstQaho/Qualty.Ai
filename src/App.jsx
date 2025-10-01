import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../src/components/LandingPage"
import Login from "../src/components/auth/Login";
import Signup from "../src/components/auth/Signup";
import CustomerSignup from "../src/components/auth/CustomerSignup";
import InspectorSignup from "../src/components/auth/InspectorSignup";
import CompanySignup from "../src/components/auth/CompanySignup";
import QuickInspection from "./components/QuickInspection"; 
import LocationDetail from "./components/LocationDetail";
import QuickInspectionForm from "./components/QuickInspectionForm";
import InspectorDashboard from "./components/dashboard/InspectorDashboard/InspectorDashboard";
import RaiseEnquiry from "./components/dashboard/CustomerDashboard/RaiseEnquiry";
import BiddingRoom from "./components/dashboard/CustomerDashboard/BiddingRoom";
import Dashboard from "./components/dashboard/CustomerDashboard/Dashboard";
import ChatWithUs from "./components/dashboard/CustomerDashboard/ChatWithUs";
import DetailAnalysis from "./components/dashboard/CustomerDashboard/DetailAnalysis";
import LiveChat from "./components/dashboard/CustomerDashboard/LiveChat";
import MyAccount from "./components/dashboard/CustomerDashboard/MyAccount";
import MyHistory from "./components/dashboard/CustomerDashboard/MyHistory";
import Payments from "./components/dashboard/CustomerDashboard/Payments";
import CustomerLayout from "./components/dashboard/CustomerDashboard/CustomerLayout";
import InspectorLayout from "./components/dashboard/InspectorDashboard/InspectorLayout";
import InspectorBidRoom from "./components/dashboard/InspectorDashboard/InspectorBidRoom";
import InspectorChatWithUs from "./components/dashboard/InspectorDashboard/InspectorChatWithUs";
import InspectorAnalysis from "./components/dashboard/InspectorDashboard/InspectorAnalysis";
import InspectorLiveChat from "./components/dashboard/InspectorDashboard/InspectorLiveChat";
import InspectorMyAccount from "./components/dashboard/InspectorDashboard/InspectorMyAccount";
import InspectorMyHistory from "./components/dashboard/InspectorDashboard/InspectorMyHistory";
import InspectorPayment from "./components/dashboard/InspectorDashboard/InspectorPayment";
import InspectionDetailsPage from "./components/dashboard/CustomerDashboard/InspectionDetailsPage";
import CompanyLayout from './components/dashboard/CompanyDashboard/CompanyLayout'
import CompanyDashboard from './components/dashboard/CompanyDashboard/CompanyDashboard'
import CompanyBidRoom from './components/dashboard/CompanyDashboard/CompanyBidRoom'
import CompanyChatWithUs from './components/dashboard/CompanyDashboard/CompanyChatWithUs'
import CompanyAnalysis from './components/dashboard/CompanyDashboard/CompanyAnalysis'
import CompanyLiveChat from './components/dashboard/CompanyDashboard/CompanyLiveChat'
import CompanyAccount from './components/dashboard/CompanyDashboard/CompanyAccount'
import CompanyHistory from './components/dashboard/CompanyDashboard/CompanyHistory'
import CompanyPayment from './components/dashboard/CompanyDashboard/CompanyPayment'
import CustomerEnquiryDetailPage from "./components/dashboard/CustomerDashboard/CustomerEnquiryDetailPage";


function App() {
  return (
    <Router>
        <ToastContainer position="top-right" autoClose={3000} />
      <Routes>    
        <Route path="*" element={<Navigate to="/"  />} />  
        <Route path="/" element={ <LandingPage/> }/>
        <Route path="/login" element={ <Login/> }/>
        <Route path="/signup" element={ <Signup/> }/>

        <Route path="/signup/customer" element={ <CustomerSignup/> }/>
        <Route path="/signup/inspector" element={ <InspectorSignup/> }/>
        <Route path="/signup/company" element={ <CompanySignup/> }/>

        <Route path="/customer" element={ <CustomerLayout/> }> 
         <Route path="dashboard" element={<Dashboard />} />
          <Route path="bidding" element={<BiddingRoom />} />
          <Route path="chat" element={<ChatWithUs />} />
          <Route path="analysis" element={<DetailAnalysis />} />
          <Route path="live-chat" element={<LiveChat />} />
          <Route path="account" element={<MyAccount />} />
          <Route path="history" element={<MyHistory />} />
          <Route path="payments" element={<Payments />} />
          <Route path="enquiry" element={<RaiseEnquiry />} />
          <Route path="inspection/:id" element={<InspectionDetailsPage />} />
          <Route path="enquiry/:id" element={<CustomerEnquiryDetailPage />} />
        </Route>

        <Route path="/inspector" element={ <InspectorLayout/> }>
         <Route path="dashboard" element={<InspectorDashboard />} />
          <Route path="bidding" element={<InspectorBidRoom />} />
          <Route path="chat" element={<InspectorChatWithUs />} />
          <Route path="analysis" element={<InspectorAnalysis />} />
          <Route path="live-chat" element={<InspectorLiveChat />} />
          <Route path="account" element={<InspectorMyAccount />} />
          <Route path="history" element={<InspectorMyHistory />} />
          <Route path="payments" element={<InspectorPayment />} />
        </Route>

        <Route path="/company" element={ <CompanyLayout/> }>
         <Route path="dashboard" element={<CompanyDashboard />} />
          <Route path="bidding" element={<CompanyBidRoom />} />
          <Route path="chat" element={<CompanyChatWithUs />} />
          <Route path="analysis" element={<CompanyAnalysis />} />
          <Route path="live-chat" element={<CompanyLiveChat />} />
          <Route path="account" element={<CompanyAccount />} />
          <Route path="history" element={<CompanyHistory />} />
          <Route path="payments" element={<CompanyPayment />} />
        </Route>

        <Route path="/quickInspection" element={ <QuickInspection />} />
        <Route path="/quickInspection/:regionName" element={ <LocationDetail />} />
        <Route path="/quickInspection/form" element={ <QuickInspectionForm />} />
        
      </Routes>
    </Router>
  );
}

export default App;