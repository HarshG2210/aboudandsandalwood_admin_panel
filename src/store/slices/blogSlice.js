import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { blogService } from "../../services/blogService";

export const createBlog = createAsyncThunk(
  "blog/create",
  async (formData, { rejectWithValue }) => {
    try {
      return await blogService.createBlog(formData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (s) => {
        s.loading = true;
      })
      .addCase(createBlog.fulfilled, (s) => {
        s.loading = false;
        s.success = true;
      })
      .addCase(createBlog.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default blogSlice.reducer;
