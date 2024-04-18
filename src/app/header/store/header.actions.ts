import { ActionCreator, createAction } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export enum HeaderActionTypes {
  Init = '[Header] Init',
}

export const initAction: ActionCreator<'[Header] Init', () => TypedAction<'[Header] Init'>> = createAction(HeaderActionTypes.Init);
