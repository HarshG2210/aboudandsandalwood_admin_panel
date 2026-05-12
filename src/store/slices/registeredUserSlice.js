import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { registeredUserService } from "../../services/registeredUserService";

// ================= THUNK =================
export const fetchRegisteredUsers = createAsyncThunk(
  "registeredUsers/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await registeredUserService.getUsers();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// ================= SLICE =================
const registeredUserSlice = createSlice({
  name: "registeredUsers",

  initialState: {
    users: [],
    count: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisteredUsers.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchRegisteredUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.users = a.payload.registered_users || [];
        s.count = a.payload.count || 0;
      })
      .addCase(fetchRegisteredUsers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

// SELECTORS
export const selectUsers = (s) => s.registeredUsers.users;
export const selectUsersCount = (s) => s.registeredUsers.count;
export const selectUsersLoading = (s) => s.registeredUsers.loading;

export default registeredUserSlice.reducer;
