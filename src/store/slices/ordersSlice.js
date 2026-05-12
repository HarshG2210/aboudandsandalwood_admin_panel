import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ordersService } from "../../services/ordersService";

// ================= FETCH ORDERS =================
export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ordersService.getOrders();
      return res;
    } catch (err) {
      console.log("❌ ORDERS ERROR:", err);
      return rejectWithValue(err);
    }
  }
);

// ================= SLICE =================
const ordersSlice = createSlice({
  name: "orders",

  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ================= SELECTORS =================
export const selectOrders = (s) => s.orders.list;
export const selectOrdersLoading = (s) => s.orders.loading;

export default ordersSlice.reducer;