import { Action, createAction, props } from '@ngrx/store';

export enum FooterActionTypes {
  FOOTER_INIT_ACTION_IDENTIFIER =  '[Footer Page] Init',
  FOOTER_SET_ACTION_IDENTIFIER = '[Footer Page] Set',
  FOOTER_SET_HAMBURG_ACTION_IDENTIFIER = '[Footer Page] Set Hamburg',
  FOOTER_SET_TOWN_ACTION_IDENTIFIER = '[Footer Page] Set Town',
  FOOTER_SAVE_TOWN_ACTION_IDENTIFIER = '[Footer Page] Save Town'
}

export const initAction = createAction(FooterActionTypes.FOOTER_INIT_ACTION_IDENTIFIER);
export const setAction = createAction(FooterActionTypes.FOOTER_SET_ACTION_IDENTIFIER, props<Record<'payload', string>>());
export const setTownHamburgAction = createAction(FooterActionTypes.FOOTER_SET_HAMBURG_ACTION_IDENTIFIER);
export const setTownAction= createAction(FooterActionTypes.FOOTER_SET_TOWN_ACTION_IDENTIFIER, props<Record<'town', string>>());

// export class SetTownAction implements Action {
//   public readonly type: string;
//
//   constructor(public payload: Record<'town', string>) {
//     this.type = FOOTER_SET_TOWN_ACTION_IDENTIFIER;
//   }
// }
//
// export type FooterActions = SetTownAction;
