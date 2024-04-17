import { createSelector } from '@ngrx/store';

import { MainState } from './main.reducers';

export const selectorsMain = (state: { main: MainState; }) => state.main;
export const selectorsMainTooltip = createSelector(
  selectorsMain,
  (main: MainState) => main.tooltip
);
export const selectorsMainName = createSelector(
  selectorsMain,
  (main: MainState) => main.name
);
// export const selectorsMainNameFirst = createSelector(
//   selectorsMain,
//   (main: MainState) => main.name.first
// );
// export const selectorsMainNameLast = createSelector(
//   selectorsMain,
//   (main: MainState) => main.name.last
// );
