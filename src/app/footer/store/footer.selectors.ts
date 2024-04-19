import {createFeatureSelector, createSelector} from '@ngrx/store';

import { FooterState } from './footer.reducers';

export const selectFeatureFooterState = createFeatureSelector<FooterState>('footer');

export const selectorsFooter = (state: { footer: FooterState; }) => state.footer;
export const selectorsFooterYear = (state: { footer: FooterState; }) => state.footer.year + 1;
export const selectorsFooterTown = createSelector(
  // selectorsFooter,
  selectFeatureFooterState,
  (footer: FooterState) => footer.town
);
export const selectorsFooterTownUpperCase = createSelector(
  selectorsFooterTown,
  (town: string) => town.toUpperCase()
);
