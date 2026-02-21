import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeat = createAsyncThunk(
  'trainSeat/getSeat',
  async ({ id, direction }) => {
    const response = await axios.get(`https://students.netoservices.ru/fe-diplom/routes/${id}/seats`);
    return { data: response.data, direction };
  }
);

// Добавьте этот экспорт, если он нужен
export const getTrain = createAsyncThunk(
  'trainSeat/getTrain',
  async (id) => {
    const response = await axios.get(`https://students.netoservices.ru/fe-diplom/routes/${id}`);
    return response.data;
  }
);

const trainSeatSlice = createSlice({
  name: 'trainSeat',
  initialState: {
    seat: {
      departure: [],
      arrival: []
    },
    selectedClassType: null,
    train: null,
    loading: false,
    error: null
  },
  reducers: {
    setSeats: (state, { payload }) => {
      const { data, direction } = payload;
      state.seat[direction] = data;
    },
    setSelectedClassType: (state, { payload }) => {
      state.selectedClassType = payload;
    },
    setTrain: (state, { payload }) => {
      state.train = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSeat.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSeat.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.seat[payload.direction] = payload.data;
      })
      .addCase(getSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTrain.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTrain.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.train = payload;
      })
      .addCase(getTrain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSeats, setSelectedClassType, setTrain } = trainSeatSlice.actions;
export const selectSeats = (state) => state.trainSeat?.seat || { departure: [], arrival: [] };
export default trainSeatSlice.reducer;