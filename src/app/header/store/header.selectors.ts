import { createSelector } from '@ngrx/store';

import { HeaderState } from './header.reducers';

export const selectorsHeader = (state: { header: HeaderState; }) => state.header;
export const selectorsFooterTownUpperCase = createSelector(
  selectorsHeader,
  (header: HeaderState) => header
);
