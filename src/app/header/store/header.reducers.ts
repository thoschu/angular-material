import { isDevMode } from '@angular/core';
import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';

const initHeaderState: HeaderState = {
  flags: {
    de: '🇩🇪',
    en: '🇬🇧'
  }
};

export interface HeaderState {
  flags: Record<'de' | 'en' , string>
}

export const headerMetaReducers: MetaReducer<HeaderState>[] = isDevMode() ? [] : [];

export const headerReducers: ActionReducer<HeaderState> = createReducer<HeaderState, Action, ActionReducer<HeaderState>>(
  initHeaderState,
);
