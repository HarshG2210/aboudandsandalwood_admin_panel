import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { stockService } from "../../services/stockService";

// FETCH STOCK HISTORY
export const fetchStockHistory = createAsyncThunk(
  "stock/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      return await stockService.getStockHistory();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockHistory.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchStockHistory.fulfilled, (s, a) => {
        s.loading = false;
        s.history = a.payload;
      })
      .addCase(fetchStockHistory.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const selectStockHistory = (s) => s.stock.history;
export const selectStockLoading = (s) => s.stock.loading;

// 🔥 BONUS: stats
export const selectStockStats = (s) => {
  const history = s.stock.history;

  return {
    totalChanges: history.length,
    totalIncrease: history
      .filter((i) => i.change > 0)
      .reduce((acc, i) => acc + i.change, 0),

    totalDecrease: history
      .filter((i) => i.change < 0)
      .reduce((acc, i) => acc + i.change, 0),
  };
};

export default stockSlice.reducer;
