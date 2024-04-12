import { createSlice } from "@reduxjs/toolkit";

export const dataScheduleSlice = createSlice({
    name: "dataSchedule",
    initialState: {
        isLoading: false,
        dataSchedule: [],
        dataStartDate: [],
        dataStartTime: [],
    },
    reducers: {
        getDataScheduleRequest: (state) => {
            state.isLoading = true;
        },
        getDataScheduleSuccess: (state, action) => {
            state.isLoading = false;
            state.dataSchedule = action.payload;
            // console.log("payload: ", action.payload);
        },
        getDataStartDate: (state, action) => {
            state.isLoading = false;
            state.dataStartDate = action.payload;
        },
        getDataStartTime: (state, action) => {
            state.isLoading = false;
            state.dataStartTime = action.payload;
        },
        getDataScheduleFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export default dataScheduleSlice.reducer;
