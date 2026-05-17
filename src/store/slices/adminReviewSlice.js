import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { adminReviewService } from "../../services/adminReviewService";

// ================= THUNKS =================

export const fetchAdminReviews = createAsyncThunk(
  "adminReviews/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await adminReviewService.getAllReviews();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createFakeReview = createAsyncThunk(
  "adminReviews/create",
  async ({ productId, data }, { rejectWithValue }) => {
    try {
      return await adminReviewService.createFakeReview(productId, data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// ================= SLICE =================

const adminReviewSlice = createSlice({
  name: "adminReviews",
  initialState: {
    reviews: [],
    total: 0,
    verified: 0,
    fake: 0,
    loading: false,
    creating: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchAdminReviews.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchAdminReviews.fulfilled, (s, a) => {
        s.loading = false;
        s.reviews = a.payload.reviews;
        s.total = a.payload.total_reviews;
        s.verified = a.payload.verified_reviews;
        s.fake = a.payload.fake_reviews;
      })
      .addCase(fetchAdminReviews.rejected, (s) => {
        s.loading = false;
      })

      // CREATE
      .addCase(createFakeReview.pending, (s) => {
        s.creating = true;
      })
      .addCase(createFakeReview.fulfilled, (s) => {
        s.creating = false;
      })
      .addCase(createFakeReview.rejected, (s) => {
        s.creating = false;
      });
  },
});

export default adminReviewSlice.reducer;
