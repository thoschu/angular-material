import { ActionCreator, createAction } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export const HEADER_INIT_ACTION_IDENTIFIER: '[Header] Init' = '[Header] Init';

export const initAction: ActionCreator<'[Header] Init', () => TypedAction<'[Header] Init'>> = createAction(HEADER_INIT_ACTION_IDENTIFIER);
