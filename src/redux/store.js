import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"
import enquiryReducer from "./slice/enquirySlice"
import BidPlacedReducer from "./slice/bidSlice"
import enquiryBidReducer from "./slice/enquiryBidSlice"
import customerEnquiryReducer from "./slice/customerEnquirySlice"


const appStore = configureStore({
    reducer:{
        user:userReducer,
        enquiry:enquiryReducer,
        bid:BidPlacedReducer,
        enquiryBid:enquiryBidReducer,
        customerEnquiry:customerEnquiryReducer
    }
})

export default appStore