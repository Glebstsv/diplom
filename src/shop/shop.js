import { configureStore } from '@reduxjs/toolkit'
import subscribeSlice from './subscribeSlice'

export const store = configureStore({
    reducer: {
        subscribe: subscribeSlice,
    }
})