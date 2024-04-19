import { createSlice } from "@reduxjs/toolkit";

export const dataDetailSlice = createSlice({
    name: "dataDetail",
    initialState: {
        isLoading: false,
        dataDetail: [],
    },
    reducers: {
        getDataDetailRequest: (state) => {
            state.isLoading = true;
        },
        getDataDetailSuccess: (state, action) => {
            state.isLoading = false;
            state.dataDetail = action.payload;
            // console.log("payload: ", action.payload);
        },
        getDataDetailFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export default dataDetailSlice.reducer;
