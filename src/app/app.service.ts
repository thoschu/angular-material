import { Injectable } from '@angular/core';
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {filter, map, never, Observable} from "rxjs";
import {lensProp, view} from "ramda";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly breakpointStates: string[] = [
    // '(max-width: 959px)',
    '(orientation: portrait)',
    '(orientation: landscape)',
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ];

  public readonly breakpointsPortrait$: Observable<Record<string, string>>;
  public readonly breakpointsLandscape$: Observable<Record<string, string>>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    const layoutChanges: Observable<BreakpointState> = this.breakpointObserver.observe(this.breakpointStates);

    const breakpoints$: Observable<Record<string, boolean>> = layoutChanges
      .pipe(
        filter((breakpointState: BreakpointState): boolean => breakpointState.matches),
        map((breakpointState: BreakpointState): Record<string, boolean> => breakpointState.breakpoints)
      );

    this.breakpointsPortrait$ =
      breakpoints$.pipe(
        filter((breakpoints: Record<string, boolean>): boolean => view<Record<string, boolean>, boolean>(lensProp<Record<string, boolean>, '(orientation: portrait)'>( '(orientation: portrait)'), breakpoints)),
        map((breakpoints: Record<string, boolean>): Record<string, string> => {
          let result: Record<string, string> = {};

          switch(true) {
            case view(lensProp(Breakpoints.XSmall), breakpoints):
              result = {'Breakpoints.XSmall': Breakpoints.XSmall};
              break;
            case view(lensProp(Breakpoints.Small), breakpoints):
              result = {'Breakpoints.Small': Breakpoints.Small};
              break;
            case view(lensProp(Breakpoints.Medium), breakpoints):
              result = {'Breakpoints.Medium': Breakpoints.Medium};
              break;
            case view(lensProp(Breakpoints.Large), breakpoints):
              result = {'Breakpoints.Large': Breakpoints.Large};
              break;
            case view(lensProp(Breakpoints.XLarge), breakpoints):
              result = {'Breakpoints.XLarge': Breakpoints.XLarge};
              break;
          }

          return result;
        })
      );

    this.breakpointsLandscape$ =
      breakpoints$.pipe(
        filter((breakpoints: Record<string, boolean>): boolean => view<Record<string, boolean>, boolean>(lensProp<Record<string, boolean>, '(orientation: landscape)'>( '(orientation: landscape)'), breakpoints)),
        map((breakpoints: Record<string, boolean>) => {
          let result: Record<string, string> = {};

          switch(true) {
            case view(lensProp(Breakpoints.XSmall), breakpoints):
              result = {'Breakpoints.XSmall': Breakpoints.XSmall};
              break;
            case view(lensProp(Breakpoints.Small), breakpoints):
              result = {'Breakpoints.Small': Breakpoints.Small};
              break;
            case view(lensProp(Breakpoints.Medium), breakpoints):
              result = {'Breakpoints.Medium': Breakpoints.Medium};
              break;
            case view(lensProp(Breakpoints.Large), breakpoints):
              result = {'Breakpoints.Large': Breakpoints.Large};
              break;
            case view(lensProp(Breakpoints.XLarge), breakpoints):
              result = {'Breakpoints.XLarge': Breakpoints.XLarge};
              break;
          }

          return result;
        })
      );
  }
}
