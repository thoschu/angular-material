import { isDevMode } from '@angular/core';
import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

import { initAction, setAction, setTownAction, setTownHamburgAction } from './footer.actions';

const initFooterState: FooterState = {
  year: new Date().getFullYear() - 1,
  town: 'Bielefeld'
};

export interface FooterState {
  year: number;
  town: string;
}

// console.log all actions
export function debug(reducer: ActionReducer<FooterState>): ActionReducer<FooterState> {
  return function(state: FooterState | undefined, action: Action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const footerMetaReducers: MetaReducer<FooterState>[] = isDevMode() ? [debug] : [debug];

export const footerReducers: ActionReducer<FooterState> = createReducer<FooterState, Action, ActionReducer<FooterState, Action>>(
  initFooterState,
  on(setTownHamburgAction, (state: FooterState): FooterState => {
    return { ...state, town: 'HH' };
  }),
  on(setTownAction, (state: FooterState, action): FooterState =>  {
    return { ...state, town: action.town };
  }),
  on(initAction, (state: FooterState, action: TypedAction<'[Footer Page] Init'> & Record<'type', '[Footer Page] Init'>): FooterState => {
    // console.log(state);
    // console.log(action);
    return { ...state };
  }),
  on(setAction, (state: FooterState, action): FooterState => {
    // console.log(state);
    // console.log(action);
    return { ...state, town: action.payload };
  })
);

// export function headerReducers(state: FooterState = initFooterState, action: any) {
//   if(action.type === '[Footer Page] Set Hamburg') {
//     return {...state, town: 'HH' };
//   } else if(action.type === '[Footer Page] Set Town') {
//     return {...state, town: action.town };
//   }
//
//   return state;
// }
