import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_express: false,
    price_from: 0,
    price_to: 10000,
    start_departure_hour_from: 0,
    start_departure_hour_to: 24,
    start_arrival_hour_from: 0,
    start_arrival_hour_to: 24,
    end_departure_hour_from: 0,
    end_departure_hour_to: 24,
    end_arrival_hour_from: 0,
    end_arrival_hour_to: 24
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilterOption: (state, action) => {
            const { id, value } = action.payload;
            if (id in state) {
                state[id] = value;
            }
        },
        setPriceRange: (state, action) => {
            const { from, to } = action.payload;
            state.price_from = from;
            state.price_to = to;
        },
        setTimeRange: (state, action) => {
            const { type, from, to } = action.payload;
            state[`${type}_from`] = from;
            state[`${type}_to`] = to;
        },
        resetFilters: () => initialState,
    }
})

export const { setFilterOption, setPriceRange, setTimeRange, resetFilters } = filterSlice.actions
export default filterSlice.reducer