
import React, { useEffect, useState } from "react";
import LiveBids from "./LiveBids";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addEnquiries } from "../../../redux/slice/enquirySlice";

const InspectorDashboard = () => {
  const [enquiryData, setEnquiryData] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/inspector/enquiries`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setEnquiryData(data.enquiries)
        dispatch(addEnquiries(data.enquiries))
      } catch (err) {
        (err);
      }
    };
    loadEnquiries();
  }, []);
  return (
    <div className="min-h-screen bg-gray-950 py-10">
     {enquiryData && <LiveBids bids={enquiryData} />}
    </div>
  );
};

export default InspectorDashboard;
