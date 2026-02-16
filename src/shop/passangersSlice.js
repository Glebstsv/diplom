// store/passangersSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const passangersSlice = createSlice({
    name: 'passangers',
    initialState: {
        passanger: [],
        orderPassanger: [],
        paymentMethod: '',
        loading: false,
        error: false,
        isInitialized: false,
    },
    reducers: {
        addPassanger: (state, { payload }) => {
            const passengerToUpdate = {
                age: "Взрослый",
                name: "",
                surname: "",
                father: "",
                gender: "",
                check: false,
                series: "",
                number: "",
                birthNumber: "",
                birthday: "",
                ...payload,
                id: payload.id || Date.now() + Math.random(),
            };

            const existingPassengerIndex = state.passanger.findIndex(
                p => p.id === passengerToUpdate.id
            );

            if (existingPassengerIndex !== -1) {
                state.passanger[existingPassengerIndex] = passengerToUpdate;
            } else {
                state.passanger.push(passengerToUpdate);
            }
        },

        removePassanger: (state, { payload: idToRemove }) => {
            state.passanger = state.passanger.filter(
                (p) => p.id !== idToRemove
            );
        },

        clearPassangers: (state) => {
            state.passanger = [];
            state.orderPassanger = [];
            state.paymentMethod = '';
            state.isInitialized = false;
        },

        setPassangersInitialized: (state) => {
            state.isInitialized = true;
        },

        addOrderPassanger: (state, { payload }) => {
            const existingPassengerIndex = state.orderPassanger.findIndex(
                p => p.id === payload.id 
            );

            if (existingPassengerIndex !== -1) {
               state.orderPassanger[existingPassengerIndex] = {
                ...state.orderPassanger[existingPassengerIndex],
                ...payload
               };
            } else {
                state.orderPassanger = [...state.orderPassanger, payload];
            }
        },
        addPaymentMethod: (state, { payload }) => {
            state.paymentMethod = payload;
        }
    }
});

export const { addPassanger, removePassanger, addOrderPassanger, addPaymentMethod, clearPassangers, setPassangersInitialized } = passangersSlice.actions;

export default passangersSlice.reducer;