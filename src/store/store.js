import adminReducer from "./slices/adminSlice";
import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./slices/ordersSlice";
import pendingUserReducer from "./slices/pendingUserSlice";
import productReducer from "./slices/productSlice";
import registeredUserReducer from "./slices/registeredUserSlice";
import stockReducer from "./slices/stockSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    product: productReducer,
    orders: ordersReducer,
    stock: stockReducer,
    pendingUsers: pendingUserReducer,
    registeredUsers: registeredUserReducer,
  },
});
