import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addCustomerEnquiries } from "../redux/slice/customerEnquirySlice";

const useFetchCustomerEnquiry = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customer/my-enquiries`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.enquiries) {         
          dispatch(addCustomerEnquiries(data.enquiries));
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };
    loadEnquiries();
  }, []);
};

export default useFetchCustomerEnquiry;