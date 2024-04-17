import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { HeaderState } from './header.reducers';

@Injectable()
export class HeaderEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<Record<'header', HeaderState>>
  ) {}
}
