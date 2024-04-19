import { createSlice } from "@reduxjs/toolkit";

export const dataHomeSlice = createSlice({
  name: "dataHome",
  initialState: {
    isLoading: false,
    dataHome: [],
  },
  reducers: {
    getDataHomeRequest: (state) => {
      state.isLoading = true;
    },
    getDataHomeSuccess: (state, action) => {
      state.isLoading = false;
      state.dataHome = action.payload;
      // console.log("payload: ", action.payload);
    },
    getDataHomeFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export default dataHomeSlice.reducer;
