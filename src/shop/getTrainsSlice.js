import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrains = createAsyncThunk(
  'trains/getTrains',
  async ({ choice, filters }) => {
    const { fromCity, toCity, fromDate, toDate } = choice;
    const queryParams = new URLSearchParams({
      from_city_id: fromCity._id,
      to_city_id: toCity._id,
      date_start: fromDate,
      date_end: toDate,
      ...filters
    });

    const response = await axios(
      `https://students.netoservices.ru/fe-diplom/routes?${queryParams.toString()}`
    );
    return response.data;
  }
);

export const getTrainsSlice = createSlice({
  name: 'trainsSlice',
  initialState: {
    items: [],
    loading: false,
    error: null,
    sortType: 'времени',
    filteredCount: 0
  },
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setTrains: (state, action) => {
      state.items = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilteredCount: (state, action) => {
      state.filteredCount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTrains.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTrains.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.items = payload.items;
      localStorage.setItem('trains', JSON.stringify(payload.items));
    });

    builder.addCase(getTrains.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });
  }
});

export const { setSortType, setTrains, setError, setFilteredCount } = getTrainsSlice.actions;
export default getTrainsSlice.reducer;