import { createSlice } from "@reduxjs/toolkit"

export const choiceSlice = createSlice({
    name: 'choice',
    initialState: {
        fromDate: '',
        toDate: '',
        fromCity: null,
        toCity: null,
    },
    reducers: {
        choiceDateFrom: (state, { payload }) => {
            state.fromDate = payload;
        },
        choiceDateTo: (state, { payload }) => {
            state.toDate = payload;
        },
        choiceCityFrom: (state, { payload }) => {
            state.fromCity = payload;
        },
        choiceCityTo: (state, { payload }) => {
            state.toCity = payload;
        },
        clear: (state) => {
            state.toDate = '';
            state.fromDate = '';
            state.toCity = null;
            state.fromCity = null;
        },
    }
})

export const {
    choiceDateFrom,
    choiceDateTo,
    choiceCityFrom,
    choiceCityTo,
    clear
} = choiceSlice.actions;

export default choiceSlice.reducer;