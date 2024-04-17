import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { MainState } from './main.reducers';

@Injectable()
export class MainEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<Record<'main', MainState>>
  ) {}
}
