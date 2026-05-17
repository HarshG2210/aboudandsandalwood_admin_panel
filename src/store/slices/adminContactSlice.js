import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { contactAdminService } from "../../services/contactAdminService";

export const fetchAdminContacts = createAsyncThunk(
  "adminContacts/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await contactAdminService.getAllContacts();
    } catch (err) {
      return rejectWithValue(err?.detail || "Failed to fetch contacts");
    }
  }
);

const adminContactSlice = createSlice({
  name: "adminContacts",

  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminContacts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })

      .addCase(fetchAdminContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminContactSlice.reducer;
