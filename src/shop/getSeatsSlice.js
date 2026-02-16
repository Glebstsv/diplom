import { createSlice } from "@reduxjs/toolkit";

const getSeatsSlice = createSlice({
    name: 'seats',
    initialState: {
        passanger: {
            departure: {
                adult: 0,
                child: 0,
                noPlace: 0
            },
            arrival: {
                adult: 0,
                child: 0,
                noPlace: 0
            }
        },
        selectedSeat: {
            departure: [],
            arrival: []
        },
        totalSum: [],
    },
    reducers: {
        addAmountPassanger: (state, { payload }) => {
            const { value, type, direction } = payload
            state.passanger[direction][type] = Number(value)
        },
        addSeat: (state, { payload }) => {
            const { type, num, id, price, direction } = payload
            const ids = state.selectedSeat[direction].map((el) => el.id);
            const sameId = ids.indexOf(id);
            
            if (sameId !== -1) {
                state.selectedSeat[direction][sameId].seats = [
                    ...state.selectedSeat[direction][sameId].seats,
                    { seat: num, price },
                ];
            } else {
                state.selectedSeat[direction] = [
                    ...state.selectedSeat[direction],
                    {
                        id,
                        type,
                        seats: [
                            {
                                seat: num,
                                price
                            },
                        ],
                    },
                ];
            }
        },
        removeSelectedSeat: (state, { payload }) => {
            const { num, direction, id } = payload;
            state.selectedSeat[direction].forEach((el) => {
                if (el.id === id) {
                    el.seats = el.seats.filter((item) => item.seat !== num);
                }
            });
        }
    }
})

export const selectSelectedSeat = (state) => {
    if (!state?.trainSeat?.selectedSeat) {
        return {
            departure: [],
            arrival: []
        };
    }
    return state.trainSeat.selectedSeat;
};

export const { addAmountPassanger, addSeat, removeSelectedSeat } = getSeatsSlice.actions
export default getSeatsSlice.reducer