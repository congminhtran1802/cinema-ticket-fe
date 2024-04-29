import { createSlice } from "@reduxjs/toolkit";

export const dataTicketSlice = createSlice({
    name: "dataTicket",
    initialState: {
        isLoading: false,
        dataTicket: [],
    },
    reducers: {
        getDataTicketRequest: (state) => {
            state.isLoading = true;
        },
        getDataTicketSuccess: (state, action) => {
            state.isLoading = false;
            state.dataTicket = action.payload;
            // console.log("payload: ", action.payload);
        },
        getDataTicketFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export default dataTicketSlice.reducer;
