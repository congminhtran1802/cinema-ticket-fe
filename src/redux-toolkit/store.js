import { configureStore } from "@reduxjs/toolkit";
import { dataHomeSlice } from "./reducer/dataHomeSlice";
import { dataDetailSlice } from "./reducer/dataDetailSlice";
import { dataBranchSlice } from "./reducer/dataBranchSlice";
import { dataScheduleSlice } from "./reducer/dataScheduleSlice";

const store = configureStore({
  reducer: {
    dataHome: dataHomeSlice.reducer,
    dataDetail: dataDetailSlice.reducer,
    dataBranch: dataBranchSlice.reducer,
    dataSchedule: dataScheduleSlice.reducer,
  },
});

export default store;
