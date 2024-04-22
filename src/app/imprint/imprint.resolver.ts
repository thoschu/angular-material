import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../app.store';
import { loadIpAction } from '../main/store/main.actions';
import { selectorsMainImprintIp } from '../main/store/main.selectors';

export const imprintResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
    const store$: Store<AppState> = inject(Store<AppState>);
    // store$.dispatch({type: 'TECHNOLOGY_RESOLVER'});

    return store$.pipe(
      tap((): void => {
        store$.dispatch(loadIpAction());
      }),
      map ((appState: AppState, count) => {
        // console.log(appState.main.imprint);
        return store$.select(selectorsMainImprintIp);
      })
    );
  }
;
