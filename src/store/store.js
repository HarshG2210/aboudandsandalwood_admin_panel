import adminReducer from "./slices/adminSlice";
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    product: productReducer,
  },
});
