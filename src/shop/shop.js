/* global process */
import { configureStore } from '@reduxjs/toolkit';
import getTrainsSliceReducer from './getTrainsSlice';
import getCitySliceReducer from './getCitySlice';
import choiceSliceReducer from './choiceSlice';
import getFilterSliceReducer from './getFilterSlice';
import getLastRoutesReducer from './getLastRoutes';
import getTrainSeatSliceReducer from './getTrainSeatSlice';
import passangersSliceReducer from './passangersSlice';
import subscribeSliceReducer from './subscribeSlice';

export const store = configureStore({
  reducer: {
    trains: getTrainsSliceReducer,
    city: getCitySliceReducer,
    choice: choiceSliceReducer,
    filters: getFilterSliceReducer,
    lastRoutes: getLastRoutesReducer,
    trainSeat: getTrainSeatSliceReducer,
    passangers: passangersSliceReducer,
    subscribe: subscribeSliceReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;