import { createSelector } from '@ngrx/store';

import { FooterState } from './footer.reducers';

export const selectorsFooter = (state: { footer: FooterState; }) => state.footer;
export const selectorsFooterYear = (state: { footer: FooterState; }) => state.footer.year + 1;
export const selectorsFooterTown = createSelector(
  selectorsFooter,
  (footer: FooterState) => footer.town
);
export const selectorsFooterTownUpperCase = createSelector(
  selectorsFooterTown,
  (town: string) => town.toUpperCase()
);
