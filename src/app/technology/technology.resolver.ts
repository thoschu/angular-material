import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../app.store';

export const technologyResolver: ResolveFn<Observable<unknown>> = (route, state) => {
  const store$: Store<AppState> = inject(Store<AppState>);

  return store$.pipe();
};
