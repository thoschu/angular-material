import { isDevMode } from '@angular/core';
import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';

import {setIconAction, setTechnologyAction} from './main.actions';

const initMainState: MainState = {
  name: {
    first: 'Sch',
    last: 'ulte',
  },
  tooltip: 'Software made in Germany',
  home: {
    greetingTooltip: '',
    test: 'Test',
  },
  technology: {
    disabled: false
  },
  imprint: {}
};

export interface MainState {
  name: Record<'first' | 'last', string>;
  tooltip: string;
  home: {
    greetingTooltip: string;
    test: unknown;
  };
  technology: {
    disabled: boolean;
  };
  imprint: Record<any, any>;
}

export const mainMetaReducers: MetaReducer<MainState>[] = isDevMode() ? [] : [];

export const mainReducers: ActionReducer<MainState> = createReducer(
  initMainState,
  on(setIconAction, (state, action ) => {
    const newState = { greetingTooltip: action.greetingTooltip };
    // debugger;
    return {...state, home: {
      ...state.home,
        ...newState
      }};
  }),
  on(setTechnologyAction, (state, action) => {
    const newState = { disabled: action.disabled };

    return {...state, technology: {
        ...state.technology,
        ...newState
      }
    };
  })
);
