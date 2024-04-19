import { createAction, props } from '@ngrx/store';

export const MAIN_HOME_UPDATE_ICON_ACTION_IDENTIFIER = '[Main Home] Update Icon';
export const MAIN_HOME_SET_TECHNOLOGY_ACTION_IDENTIFIER = '[Main Home] Set Technology';

export const setIconAction= createAction(
  MAIN_HOME_UPDATE_ICON_ACTION_IDENTIFIER,
  props<Record<'greetingTooltip', string>>()
);

export const setTechnologyAction= createAction(
  MAIN_HOME_SET_TECHNOLOGY_ACTION_IDENTIFIER,
  props<Record<'disabled', boolean>>()
);
