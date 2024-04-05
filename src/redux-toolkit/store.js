import { configureStore } from "@reduxjs/toolkit";
import { dataHomeSlice } from "./reducer/dataHomeSlice";
import { dataDetailSlice } from "./reducer/dataDetailSlice";

const store = configureStore({
  reducer: {
    dataHome: dataHomeSlice.reducer,
    dataDetail: dataDetailSlice.reducer,
  },
});

export default store;
