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

      return rejectWithValue(
        err?.detail || err?.message || "Failed to fetch orders"
      );
    }
  }
);

// ================= UPDATE STATUS =================
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",

  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await ordersService.updateOrderStatus({
        orderId,
        status,
      });

      return {
        orderId,
        status,
        data: res,
      };
    } catch (err) {
      console.log("❌ UPDATE STATUS ERROR:", err);

      return rejectWithValue(
        err?.detail || err?.message || "Failed to update order status"
      );
    }
  }
);

// ================= SLICE =================
const ordersSlice = createSlice({
  name: "orders",

  initialState: {
    list: [],
    loading: false,

    updateLoading: {},

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // ================= FETCH =================

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
      })

      // ================= UPDATE STATUS =================

      .addCase(updateOrderStatus.pending, (state, action) => {
        const orderId = action.meta.arg.orderId;

        state.updateLoading[orderId] = true;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload;

        state.updateLoading[orderId] = false;

        const order = state.list.find((o) => String(o.id) === String(orderId));

        if (order) {
          order.status = status;
        }
      })

      .addCase(updateOrderStatus.rejected, (state, action) => {
        const orderId = action.meta.arg.orderId;

        state.updateLoading[orderId] = false;

        state.error = action.payload;
      });
  },
});

// ================= SELECTORS =================
export const selectOrders = (s) => s.orders.list;

export const selectOrdersLoading = (s) => s.orders.loading;

export const selectOrderUpdateLoading = (orderId) => (s) =>
  s.orders.updateLoading[orderId] || false;

export default ordersSlice.reducer;
