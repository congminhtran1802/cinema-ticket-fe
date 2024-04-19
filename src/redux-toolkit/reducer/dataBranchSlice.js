import { createSlice } from "@reduxjs/toolkit";

export const dataBranchSlice = createSlice({
    name: "dataBranch",
    initialState: {
        isLoading: false,
        dataBranch: [],
    },
    reducers: {
        getDataBranchRequest: (state) => {
            state.isLoading = true;
        },
        getDataBranchSuccess: (state, action) => {
            state.isLoading = false;
            state.dataBranch = action.payload;
            // console.log("payload: ", action.payload);
        },
        getDataBranchFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export default dataBranchSlice.reducer;
