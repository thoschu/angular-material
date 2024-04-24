import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { setAction } from './aside.actions';

const initAsideState: AsideState = {};

export interface AsideState {}

export const footerReducers = createReducer(
  initAsideState,
  on(setAction, (state) => {
    return { ...state };
  })
);
