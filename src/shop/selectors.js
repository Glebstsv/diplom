import { createSelector } from '@reduxjs/toolkit';

export const selectChoice = createSelector(
  (state) => state.choice,
  (choice) => choice || {}
);

export const selectFilters = createSelector(
  (state) => state.filter,
  (filter) => filter || {}
);

export const selectTrainsState = createSelector(
  (state) => state.trains,
  (trains) => trains || { items: [], loading: false, error: null }
);

export const selectTrainsItems = createSelector(
  selectTrainsState,
  (trains) => trains.items || []
);

export const selectTrainsLoading = createSelector(
  selectTrainsState,
  (trains) => trains.loading || false
);

export const selectTrainsError = createSelector(
  selectTrainsState,
  (trains) => trains.error || null
);

export const selectFilteredCount = createSelector(
  selectTrainsState,
  (trains) => trains.filteredCount || 0
);

export const selectSortType = createSelector(
  selectTrainsState,
  (trains) => trains.sortType || 'времени'
);

export const selectTrainSeatState = createSelector(
  (state) => state.trainSeat,
  (trainSeat) => trainSeat || { seat: { departure: [], arrival: [] }, selectedClassType: null, train: null }
);

export const selectTrain = createSelector(
  selectTrainSeatState,
  (trainSeat) => trainSeat.train
);

export const selectSeats = createSelector(
  selectTrainSeatState,
  (trainSeat) => trainSeat.seat || { departure: [], arrival: [] }
);

export const selectSelectedClassType = createSelector(
  selectTrainSeatState,
  (trainSeat) => trainSeat.selectedClassType
);

export const selectSeatsState = createSelector(
  (state) => state.seats,
  (seats) => seats || { 
    passanger: { departure: { adult: 0, child: 0, noPlace: 0 }, arrival: { adult: 0, child: 0, noPlace: 0 } },
    selectedSeat: { departure: [], arrival: [] },
    totalSum: []
  }
);

export const selectSelectedSeat = createSelector(
  selectSeatsState,
  (seats) => seats.selectedSeat || { departure: [], arrival: [] }
);

export const selectPassangerCount = createSelector(
  selectSeatsState,
  (seats) => seats.passanger || { departure: { adult: 0, child: 0, noPlace: 0 }, arrival: { adult: 0, child: 0, noPlace: 0 } }
);

export const selectTotalSum = createSelector(
  selectSeatsState,
  (seats) => seats.totalSum || []
);

export const selectCityState = createSelector(
  (state) => state.city,
  (city) => city || { from: [], to: [], loading: false }
);

export const selectFromCities = createSelector(
  selectCityState,
  (city) => city.from || []
);

export const selectToCities = createSelector(
  selectCityState,
  (city) => city.to || []
);

export const selectLastRoutes = createSelector(
  (state) => state.lastRoutes,
  (lastRoutes) => lastRoutes || []
);

export const selectPassangers = createSelector(
  (state) => state.passangers,
  (passangers) => passangers || { departure: [], arrival: [] }
);

export const selectSubscribe = createSelector(
  (state) => state.subscribe,
  (subscribe) => subscribe || { loading: false, success: false, error: null }
);