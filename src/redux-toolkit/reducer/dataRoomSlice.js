import { createSlice } from "@reduxjs/toolkit";

export const dataRoomSlice = createSlice({
    name: "dataRoom",
    initialState: {
        isLoading: false,
        dataRoom: [],
    },
    reducers: {
        getDataRoomRequest: (state) => {
            state.isLoading = true;
        },
        getDataRoomSuccess: (state, action) => {
            state.isLoading = false;
            state.dataRoom = action.payload;
            // console.log("payload: ", action.payload);
        },
        getDataRoomFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export default dataRoomSlice.reducer;
