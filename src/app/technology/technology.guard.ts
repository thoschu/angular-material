import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';

import { AppState } from '../app.store';
import { selectorsMainTechnologyDisabled } from '../main/store/main.selectors';

export const technologyGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject<Router>(Router);
  const store: Store<AppState> = inject<Store<AppState>>(Store<AppState>);
  // const technologyDisabled$: Observable<boolean> = store.select(selectorsMainTechnologyDisabled);
  const technologyDisabled$: Observable<boolean> = store.pipe(select(selectorsMainTechnologyDisabled));

  return technologyDisabled$.pipe(
    map((value: boolean) => !value),
    tap(async (value: boolean): Promise<void> => {
      if(!value) {
        await router.navigate(['/'])
      }
    })
  );
}
