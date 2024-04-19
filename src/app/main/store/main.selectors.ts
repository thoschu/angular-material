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
export const selectorsMainHome = createSelector(
  selectorsMain,
  (main: MainState) => main.home
);

export const selectorsMainTechnology = createSelector(
  selectorsMain,
  (main: MainState) => main.technology
);
export const selectorsMainHomeGreetingTooltip = createSelector(
  selectorsMainHome,
  (home) => home.greetingTooltip
);
export const selectorsMainTechnologyDisabled = createSelector(
  selectorsMainTechnology,
  (technology) => technology.disabled
);

// export const selectorsMainNameFirst = createSelector(
//   selectorsMain,
//   (main: MainState) => main.name.first
// );
// export const selectorsMainNameLast = createSelector(
//   selectorsMain,
//   (main: MainState) => main.name.last
// );
