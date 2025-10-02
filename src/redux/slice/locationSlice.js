import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLocationLoading: (state) => {
      state.loading = true;
    },
    setLocationError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLocation, setLocationLoading, setLocationError } = locationSlice.actions;
export default locationSlice.reducer;