import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createHeroSection,
  getHeroSections,
  updateHeroSection,
} from "../../services/heroService";

// ==========================================
// FETCH HERO
// ==========================================

export const fetchHeroSections = createAsyncThunk(
  "hero/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getHeroSections();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// ==========================================
// CREATE HERO
// ==========================================

export const submitHero = createAsyncThunk(
  "hero/create",
  async (formData, { rejectWithValue }) => {
    try {
      return await createHeroSection(formData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// ==========================================
// UPDATE HERO
// ==========================================

export const editHero = createAsyncThunk(
  "hero/update",
  async (formData, { rejectWithValue }) => {
    try {
      return await updateHeroSection(formData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const heroSlice = createSlice({
  name: "hero",

  initialState: {
    loading: false,
    updating: false,
    data: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchHeroSections.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchHeroSections.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      .addCase(fetchHeroSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(submitHero.pending, (state) => {
        state.updating = true;
      })

      .addCase(submitHero.fulfilled, (state) => {
        state.updating = false;
      })

      .addCase(submitHero.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(editHero.pending, (state) => {
        state.updating = true;
      })

      .addCase(editHero.fulfilled, (state) => {
        state.updating = false;
      })

      .addCase(editHero.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export default heroSlice.reducer;
