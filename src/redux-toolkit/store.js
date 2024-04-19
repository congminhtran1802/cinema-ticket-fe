import { configureStore } from "@reduxjs/toolkit";
import { dataHomeSlice } from "./reducer/dataHomeSlice";
import { dataDetailSlice } from "./reducer/dataDetailSlice";
import { dataBranchSlice } from "./reducer/dataBranchSlice";
import { dataScheduleSlice } from "./reducer/dataScheduleSlice";
import { dataSearchSlice } from "./reducer/dataSearchSlice";
import { userSlice } from "./reducer/loginSlice"
const store = configureStore({
  reducer: {
    dataHome: dataHomeSlice.reducer,
    dataDetail: dataDetailSlice.reducer,
    dataBranch: dataBranchSlice.reducer,
    dataSchedule: dataScheduleSlice.reducer,
    dataSearch: dataSearchSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
