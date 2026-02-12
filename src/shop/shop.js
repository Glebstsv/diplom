import { configureStore } from '@reduxjs/toolkit'
import subscribeSlice from './subscribeSlice'
import choiceReducer from './choiceSlice'
import getCityReducer from './getCitySlice'
import getTrainsReducer from './getTrainsSlice'
import filterReducer from './getFilterSlice'
import lastRoutesReducer from './getLastRoutes'

export const store = configureStore({
    reducer: {
        subscribe: subscribeSlice,
        choice: choiceReducer,
        city: getCityReducer,
        trains: getTrainsReducer,
        filter: filterReducer,
        lastRoutes: lastRoutesReducer
    }
})