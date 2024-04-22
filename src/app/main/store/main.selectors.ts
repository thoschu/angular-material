import {createFeatureSelector, createSelector} from '@ngrx/store';

import { MainState } from './main.reducers';

export const selectFeatureMainState = createFeatureSelector<MainState>('main');
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
export const selectorsMainImprint = createSelector(
  selectFeatureMainState,
  (main: MainState) => main.imprint
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

export const selectorsMainImprintIp = createSelector(
  selectorsMainImprint,
  (imprint) => imprint.ip
);

export const selectorsMainTechnologyCrypto = createSelector(
  selectorsMainImprint,
  (imprint) => imprint
);

// export const selectorsMainNameFirst = createSelector(
//   selectorsMain,
//   (main: MainState) => main.name.first
// );
// export const selectorsMainNameLast = createSelector(
//   selectorsMain,
//   (main: MainState) => main.name.last
// );
