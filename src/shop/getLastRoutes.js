import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

export const getRoutes = createAsyncThunk(
    'routes/lastRoutes',
    async() => {
        const response = await axios(`https://students.netoservices.ru/fe-diplom/routes/last`);
        return response.data
    }
)

export const getLastRoutes = createSlice({
    name: 'lastRoutes',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getRoutes.pending, (state) => {
            state.loading =  true;
        });
        
        builder.addCase(getRoutes.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.items = payload
        });
        
        builder.addCase(getRoutes.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error
        })
    }
})

export default getLastRoutes.reducer