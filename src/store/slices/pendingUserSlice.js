import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pendingUserService } from "../../services/pendingUserService";

// ================= THUNK =================
export const fetchPendingUsers = createAsyncThunk(
  "pendingUsers/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await pendingUserService.getPendingUsers();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// ================= SLICE =================
const pendingUserSlice = createSlice({
  name: "pendingUsers",

  initialState: {
    users: [],
    count: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingUsers.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchPendingUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.users = a.payload.pending_users || [];
        s.count = a.payload.count || 0;
      })
      .addCase(fetchPendingUsers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

// SELECTORS
export const selectPendingUsers = (s) => s.pendingUsers.users;
export const selectPendingCount = (s) => s.pendingUsers.count;
export const selectPendingLoading = (s) => s.pendingUsers.loading;

export default pendingUserSlice.reducer;
