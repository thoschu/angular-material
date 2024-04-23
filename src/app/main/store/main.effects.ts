import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { combineLatest, map, Observable, switchMap, take, tap } from 'rxjs';
import {assoc, head, last, mapObjIndexed} from 'ramda';

import { loadIpAction, setIpAction, setTechnologyAction } from './main.actions';
import { AppState } from '../../app.store';

@Injectable()
export class MainEffects {
  private readonly setTechnologyDisabledEffect$: Observable<Record<"disabled", boolean>> & CreateEffectMetadata = createEffect(() => this.actions$.pipe(
    ofType(setTechnologyAction),
    tap((action: Record<'disabled', boolean>): void => {
      // console.log(action);
    })
  ), { dispatch: false });

  private readonly setImprintIpEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadIpAction),
      switchMap((action: TypedAction<"[Imprint Resolver] Load IP">) => this.httpClient.get('https://checkip.amazonaws.com/',{ responseType: 'text' })),
      map((data: string) => this.httpClient.get<Record<string, string>>(`https://ipapi.co/${data}/json/`)),
      switchMap((res$: Observable<Record<string, string>>) => combineLatest<[Record<string, string>, string]>([res$, this.httpClient.get('https://1.1.1.1/cdn-cgi/trace',{ responseType: 'text' }).pipe(map((res: string) => this.parseConfig<'uag'>(res).uag))])),
      map((res: [Record<string, string>, string]) => assoc<string | Record<string, string> | undefined, Record<string, string>, 'user'>('user', last<string | Record<string, string>>(res), head<Record<string, string>, string>(res))),
      map((ip: Record<string, string>) => setIpAction({ ip })),
    );
  },{ dispatch: true });

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly httpClient: HttpClient,
  ) {
    actions$.subscribe((action: Action) => {
      // console.log('MainEffects', action);
      // console.log(action.type);
      // this.httpClient.get('http://localhost:3000/api').subscribe((data: any) => {});
    });
  }

  private parseConfig<T extends string>(inputString: string): Record<T, string> {
    const lines: Array<string> = inputString.split('\n');
    const configObject: Record<string, string> = {};

    lines.forEach((line: string): void => {
      const [key, value]: Array<string> = line.split('=');

      configObject[key] = value;
    });

    return configObject;
  }
}
