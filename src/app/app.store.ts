import { isDevMode } from '@angular/core';
import {
  Action, ActionReducer, ActionReducerMap,
  createAction, createFeatureSelector, createReducer, createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

import { footerReducers, FooterState } from './footer/store/footer.reducers';
import { headerReducers, HeaderState } from './header/store/header.reducers';
import { mainReducers, MainState } from './main/store/main.reducers';

export interface AppState {
  header: HeaderState;
  main: MainState;
  footer: FooterState;
  router: RouterState;
}

export const appReducers: ActionReducerMap<AppState> = {
  header: headerReducers,
  main: mainReducers,
  footer: footerReducers,
  router: routerReducer
};

export const appMetaReducers: MetaReducer<AppState>[] = isDevMode() ? [debug] : [debugProd];

function debug(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action) => {
    console.log('state', state);
    console.log('action', action);
    // Logging to OpenTelemetry-Collector

    return reducer(state, action);
  };
}

function debugProd(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action) => {
    return reducer(state, action);
  };
}
