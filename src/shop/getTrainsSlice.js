import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrains = createAsyncThunk(
  'trains/getTrains',
  async ({ choice, filters }) => {
    const { fromCity, toCity, fromDate, toDate } = choice;
    
    if (!fromCity?._id || !toCity?._id) {
      throw new Error('Не выбраны города отправления и назначения');
    }

    const params = {
      from_city_id: fromCity._id,
      to_city_id: toCity._id,
      date_start: fromDate,
    };

    if (toDate) {
      params.date_end = toDate;
    }

    if (filters.have_first_class) params.have_first_class = true;
    if (filters.have_second_class) params.have_second_class = true;
    if (filters.have_third_class) params.have_third_class = true;
    if (filters.have_fourth_class) params.have_fourth_class = true;
    
    if (filters.have_wifi) params.have_wifi = true;
    if (filters.have_express) params.have_express = true;
    
    if (filters.price_from !== undefined && filters.price_from !== 0) {
      params.price_from = filters.price_from;
    }
    if (filters.price_to !== undefined && filters.price_to !== 10000) {
      params.price_to = filters.price_to;
    }
    
    if (filters.start_departure_hour_from !== 0) {
      params.start_departure_hour_from = filters.start_departure_hour_from;
    }
    if (filters.start_departure_hour_to !== 24) {
      params.start_departure_hour_to = filters.start_departure_hour_to;
    }
    if (filters.start_arrival_hour_from !== 0) {
      params.start_arrival_hour_from = filters.start_arrival_hour_from;
    }
    if (filters.start_arrival_hour_to !== 24) {
      params.start_arrival_hour_to = filters.start_arrival_hour_to;
    }

    const response = await axios.get(
      `https://students.netoservices.ru/fe-diplom/routes`,
      { params }
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
    builder
      .addCase(getTrains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrains.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.items || [];
        localStorage.setItem('trains', JSON.stringify(payload.items || []));
      })
      .addCase(getTrains.rejected, (state, { error, payload }) => {
        state.loading = false;
        state.error = payload || error.message;
      });
  }
});

export const { setSortType, setTrains, setError, setFilteredCount } = getTrainsSlice.actions;
export default getTrainsSlice.reducer;