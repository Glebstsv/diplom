import { configureStore } from '@reduxjs/toolkit'
import subscribeSlice from './subscribeSlice'
import choiceReducer from './choiceSlice'
import getCityReducer from './getCitySlice'
import getTrainsReducer from './getTrainsSlice'

export const store = configureStore({
    reducer: {
        subscribe: subscribeSlice,
        choice: choiceReducer,
        citySlice: getCityReducer,
        trainsSlice: getTrainsReducer,
    }
})