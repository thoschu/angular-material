import { Action, createAction, props } from '@ngrx/store';

export const FOOTER_INIT_ACTION_IDENTIFIER = '[Footer Page] Init';
export const FOOTER_SET_ACTION_IDENTIFIER = '[Footer Page] Set';
export const FOOTER_SET_HAMBURG_ACTION_IDENTIFIER = '[Footer Page] Set Hamburg';
export const FOOTER_SET_TOWN_ACTION_IDENTIFIER = '[Footer Page] Set Town';
export const FOOTER_SAVE_TOWN_ACTION_IDENTIFIER = '[Footer Page] Save Town';

export const initAction = createAction(FOOTER_INIT_ACTION_IDENTIFIER);
export const setAction = createAction(FOOTER_SET_ACTION_IDENTIFIER, props<Record<'payload', string>>());
export const setTownHamburgAction = createAction(FOOTER_SET_HAMBURG_ACTION_IDENTIFIER);
export const setTownAction= createAction(FOOTER_SET_TOWN_ACTION_IDENTIFIER, props<Record<'town', string>>());

export * as FooterActions from './footer.actions';

// export class SetTownAction implements Action {
//   public readonly type: string;
//
//   constructor(public payload: Record<'town', string>) {
//     this.type = FOOTER_SET_TOWN_ACTION_IDENTIFIER;
//   }
// }
//
// export type FooterActions = SetTownAction;
