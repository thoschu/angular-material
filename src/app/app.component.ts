import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import {filter, Observable} from 'rxjs';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected readonly title: string = 'Tom S.';

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly mediaMatcher: MediaMatcher
  ) {
    const mediaQueryList: MediaQueryList = mediaMatcher.matchMedia(Breakpoints.Tablet);
    console.log(mediaQueryList);
  }

  ngOnInit(): void {
    const layoutChanges: Observable<BreakpointState> = this.breakpointObserver.observe([
      // '(orientation: portrait)',
      // '(orientation: landscape)',
      // Breakpoints.HandsetLandscape,
      // Breakpoints.HandsetPortrait,
      Breakpoints.Handset,
      // Breakpoints.TabletLandscape,
      // Breakpoints.TabletPortrait,
      // Breakpoints.Tablet,
      // Breakpoints.WebLandscape,
      // Breakpoints.WebPortrait,
      // Breakpoints.Web,
      // Breakpoints.XSmall,
      // Breakpoints.Small,
      // Breakpoints.Medium,
      // Breakpoints.Large,
      // Breakpoints.XLarge,
      // '(max-width: 959px)',
    ]);

    layoutChanges
      // .pipe(filter((breakpointState: BreakpointState) => breakpointState.matches))
      .subscribe((breakpointState: BreakpointState): void => {
        console.log(breakpointState);
      });
  }
}
