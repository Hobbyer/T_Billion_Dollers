import { configureStore } from "@reduxjs/toolkit";
import sersorSlice from "./sensorSlice";
import memberSlice from "./memberSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    sensor:sersorSlice.reducer,
    members: memberSlice.reducer,
    orders: orderSlice.reducer
  }
})

export default store;