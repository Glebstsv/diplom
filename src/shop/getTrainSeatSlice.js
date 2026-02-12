import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeat = createAsyncThunk(
    'seat/getSeat',
    async({ id, direction }) => {
        const response = await axios(`https://students.netoservices.ru/fe-diplom/routes/${id}/seats`)
        const data = response.data;
        return { data, direction };
    }
)

const data = localStorage.getItem('seats');

const getTrainSeatSlice = createSlice({
    name: 'getTrainSeat',
    initialState: {
        train: data ? JSON.parse(data) : [],
        loading: false,
        error: null,
        seat: {
            departure: [],
            arrival: []
        },
        selectedSeat: {
            departure: [],
            arrival: []
        },
        type: []
    },
    reducers: {
        getTrain: (state, { payload }) => {
            state.train = payload;
            localStorage.setItem('train', JSON.stringify(payload))
        },
        getSelectedSeat: (state, { payload }) => {
            const { el, direction } = payload
            state.selectedSeat[direction] = el;
        },
        getCarriageType: (state, { payload }) => {
            state.type = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSeat.pending, (state) => {
            state.loading =  true;
        });

        builder.addCase(getSeat.fulfilled, (state, { payload } ) => {
            const { data, direction } = payload;
            state.loading = false;
            state.seat[direction] = data;
        });
        
        builder.addCase(getSeat.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error
        })
    }    
})

export default getTrainSeatSlice.reducer

export const { getTrain, getSelectedSeat, getCarriageType, getDirection } = getTrainSeatSlice.actions