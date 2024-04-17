import { isDevMode } from '@angular/core';
import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';

const initMainState: MainState = {
  name: {
    first: 'Sch',
    last: 'ulte',
  },
  tooltip: 'Software made in Germany',
};

export interface MainState {
  name: Record<'first' | 'last', string>;
  tooltip: string;
}

export const mainMetaReducers: MetaReducer<MainState>[] = isDevMode() ? [] : [];

export const mainReducers: ActionReducer<MainState> = createReducer<MainState, Action, ActionReducer<MainState>>(
  initMainState,
);
