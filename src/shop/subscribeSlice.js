import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSubscribe = createAsyncThunk(
    'subscribe/getSubscribe',
    async (mail) => {
        const response = await fetch(`https://students.netoservices.ru/fe-diplom/subscribe?email=${mail}`, {
            method: 'POST',
            body: JSON.stringify({ email: mail })
        });
        return await response.json();
    }
);

const subscribeSlice = createSlice({
    name: 'subscribe',
    initialState: {
        open: false,
        status: '',
        text: '',
        loading: false,
        error: null,
        items: []
    },
    reducers: {
        changePopup: (state, { payload }) => {
            state.open = true;
            state.status = 'success';
            state.text = payload;
        },
        error: (state, { payload }) => {
            state.open = true;
            state.status = 'error'; 
            state.text = payload;
        },
        clearPopup: (state) => {
            state.open = false;
            state.status = '';
            state.text = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSubscribe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubscribe.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.items = payload;
                state.open = true;
                state.status = 'success';
            })
            .addCase(getSubscribe.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
                state.open = true;
                state.status = 'error';
                state.text = 'Ошибка подписки';
            });
    }
});

export const { changePopup, clearPopup, error } = subscribeSlice.actions;
export default subscribeSlice.reducer;