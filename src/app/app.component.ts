import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import {keys, lensProp, omit, pickAll, pickBy, prop, view} from 'ramda';
import {filter, map, Observable} from 'rxjs';

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
    private readonly mediaMatcher: MediaMatcher
  ) {
    const mediaQueryList: MediaQueryList = mediaMatcher.matchMedia(Breakpoints.Tablet);
    console.log(mediaQueryList);
  }

  ngOnInit(): void {

  }
}
