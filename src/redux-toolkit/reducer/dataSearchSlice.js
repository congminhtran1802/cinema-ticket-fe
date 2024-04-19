import { createSlice } from "@reduxjs/toolkit";

export const dataSearchSlice = createSlice({
  name: "dataSearch",
  initialState: {
    isLoadingSearch: false,
    dataSearch: [],
  },
  reducers: {
    getDataSearchequest: (state) => {
      state.isLoadingSearch = true;
    },
    getDataSearchSuccess: (state, action) => {
      state.isLoadingSearch = false;
      state.dataSearch = action.payload;
      // console.log("payload: ", action.payload);
    },
    getDataSearchFailure: (state) => {
      state.isLoadingSearch = false;
    },
  },
});

export default dataSearchSlice.reducer;
