import adminContactReducer from "./slices/adminContactSlice";
import adminReducer from "./slices/adminSlice";
import adminReviewsReducer from "./slices/adminReviewSlice";
import blogReducer from "./slices/blogSlice";
import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "./slices/heroSlice";
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
    hero: heroReducer,
    blog: blogReducer,
    adminReviews: adminReviewsReducer,
    adminContacts: adminContactReducer,
  },
});
