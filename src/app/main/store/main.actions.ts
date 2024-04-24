import { createAction, props } from '@ngrx/store';

export const MAIN_HOME_UPDATE_ICON_ACTION_IDENTIFIER = '[Main Home] Update Icon';
export const MAIN_HOME_SET_TECHNOLOGY_ACTION_IDENTIFIER = '[Main Home] Set Technology';
export const MAIN_LOAD_IP_ACTION_IDENTIFIER = '[Imprint Resolver] Load IP';
export const MAIN_SET_IP_ACTION_IDENTIFIER = '[Footer Effect] Set IP';

export const setIconAction= createAction(
  MAIN_HOME_UPDATE_ICON_ACTION_IDENTIFIER,
  props<Record<'greetingTooltip', string>>()
);

export const setTechnologyAction= createAction(
  MAIN_HOME_SET_TECHNOLOGY_ACTION_IDENTIFIER,
  props<Record<'disabled', boolean>>()
);

export const loadIpAction = createAction(
  MAIN_LOAD_IP_ACTION_IDENTIFIER
);

export const setIpAction = createAction(
  MAIN_SET_IP_ACTION_IDENTIFIER,
  props<Record<'ip', Record<string, string>>>()
);
