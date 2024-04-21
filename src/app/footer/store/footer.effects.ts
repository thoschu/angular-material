import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { Action, Store } from '@ngrx/store';
import { Observable, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { initAction, setAction, setTownAction } from './footer.actions';
import { selectorsFooterTown, selectorsFooterTownUpperCase } from './footer.selectors';
import { AppState } from '../../app.store';

@Injectable()
export class FooterEffects {
  public saveTown$: Observable<[Record<'town', string> & TypedAction<'[Footer Page] Set Town'>, string]> & CreateEffectMetadata;
  public load$;

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>
  ) {

    this.load$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(initAction),
        switchMap(() => {
          return of(setAction({ payload:  localStorage.getItem('town') ?? 'Berlin' }));
        })
      );
    }, { dispatch: true });

    this.saveTown$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(setTownAction,),
        withLatestFrom(this.store.select(selectorsFooterTownUpperCase)),
        tap(([action, town]) => {
          // console.log(action);
          // console.log(town);
          localStorage.setItem('town', action.town.toString());
          return action;
        })
      );
    }, { dispatch: false });
  }
}
