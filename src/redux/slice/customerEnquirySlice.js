import { createSlice } from "@reduxjs/toolkit";

const customerEnquirySlice = createSlice({
  name: "customerEnquiry",
  initialState: {
    customerEnquiry: [],
  },
  reducers: {
    addCustomerEnquiries: (state, action) => {
      state.customerEnquiry = action.payload;
    },
    clearCustomerEnquiry: (state) => {
      state.customerEnquiry = null;
    },
  },
});

export const {
  addCustomerEnquiries,
  clearCustomerEnquiry,

} = customerEnquirySlice.actions;

export default customerEnquirySlice.reducer;