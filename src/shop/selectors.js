import { createSelector } from '@reduxjs/toolkit';

export const selectChoice = createSelector(
  (state) => state.choice,
  (choice) => choice || {}
);

export const selectFilters = createSelector(
  (state) => state.filter,
  (filter) => filter || {}
);

export const selectTrainsItems = createSelector(
  (state) => state.trains,
  (trains) => trains?.items || []
);

export const selectFilteredCount = createSelector(
  (state) => state.trains,
  (trains) => trains?.filteredCount || 0
);