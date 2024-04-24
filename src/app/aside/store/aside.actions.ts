import { Action, createAction, props } from '@ngrx/store';

export const ASIDE_INIT_ACTION_IDENTIFIER = '[Aside Page] Init';
export const ASIDE_SET_ACTION_IDENTIFIER = '[Aside Page] Set';

export const initAction = createAction(ASIDE_INIT_ACTION_IDENTIFIER);
export const setAction = createAction(ASIDE_SET_ACTION_IDENTIFIER, props<Record<'payload', string>>());
