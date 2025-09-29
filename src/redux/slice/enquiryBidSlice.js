import { createSlice } from "@reduxjs/toolkit";

const enquiryBidSlice = createSlice({
  name: "enquiryBid",
  initialState: {
    bids: [],
    stats: null,
  },
  reducers: {
    addInspectionBids: (state, action) => {
      state.bids = action.payload;
    },
    addInspectionStats: (state, action) => {
      state.stats = action.payload;
    },
    clearInspectionBidData: (state) => {
      state.bids = [];
      state.stats = null;
    }
  },
});

export const {
  addInspectionBids,
  addInspectionStats,
  clearInspectionBidData,
} = enquiryBidSlice.actions;

export default enquiryBidSlice.reducer;