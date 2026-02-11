import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const getCity = createAsyncThunk(
    'city/getCity',
    async(city) => {
        const response = await axios(`https://students.netoservices.ru/fe-diplom/routes/cities?name=${city}`);
        return response.data
    }
)

export const getCitySlice = createSlice({
    name: 'citySlice',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {
        clearCity: (state) => {
            state.items = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCity.pending, (state) => {
            state.loading =  true;
        }); 

        builder.addCase(getCity.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.items = payload
        });
        
        builder.addCase(getCity.rejected, (state, { error }) => {
            state.loading = false;
            state.error = error
        })
    }
})

export const { clearCity } = getCitySlice.actions;
export default getCitySlice.reducer