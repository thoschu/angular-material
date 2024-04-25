import { Component } from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenuItem } from '@angular/material/menu';
import { TranslocoDirective } from '@jsverse/transloco';
import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatTooltip } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../app.store';
import {selectorsMainHomeGreetingTooltip} from "../main/store/main.selectors";
import {setIconAction} from "../main/store/main.actions";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatCard, MatCardContent,
    MatCardHeader, MatDivider, MatIcon,
    MatMenuItem, TranslocoDirective, CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport, MatTooltip, AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected greetingTooltip$: Observable<string>;
  private readonly icons: string[] = ['🌼', '🌻', '🌺', '🌹', '🌷', '🌸', '💐', '🍀', '🌿', '🍁', '🍂', '🍃', '🌾', '🌵', '🌴', '🌲', '🌳', '🌱', '🌼'];

  constructor(protected readonly store: Store<AppState>) {
    // this.greetingTooltip$ = this.store.select('main', 'home', 'greetingTooltip');
    this.greetingTooltip$ = this.store.select(selectorsMainHomeGreetingTooltip);
  }

  ngOnInit(): void {
    // this.store.dispatch({type: '[Footer Page] Set Hamburg'});
    // this.store.dispatch(setTownHamburgAction());

    // this.store.dispatch({
    //   type: '[Main Home] Update Icon',
    //   greetingTooltip: this.randomElement<string>(this.icons)
    // });

    setInterval((that: HomeComponent): void => {
      // this.store.dispatch({
      //   type: '[Main Home] Update Icon',
      //   greetingTooltip: this.randomElement<string>(this.icons)
      // });

      that.store.dispatch(setIconAction({ greetingTooltip: that.randomElement<string>(that.icons) }));
    }, 77000, this);
  }


  private randomElement<T>(arr: T[]): T {
    const index: number = Math.floor(Math.random() * arr.length);

    return arr[index];
  }
}
