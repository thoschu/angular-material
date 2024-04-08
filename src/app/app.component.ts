import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { CdkObserveContent } from '@angular/cdk/observers';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';
import {
  NgcCookieConsentService,
  NgcInitializationErrorEvent,
  NgcInitializingEvent, NgcNoCookieLawEvent,
  NgcStatusChangeEvent
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';

import { AppService } from './app.service';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HeaderComponent, MainComponent, FooterComponent,
    CdkObserveContent, AsyncPipe, LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy, OnInit {
  protected readonly title: string = 'Tom S.';
  private readonly _horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private readonly _verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private readonly _subscriptions: Subscription[] = [];

  constructor(
    private readonly _mediaMatcher: MediaMatcher,
    private readonly _snackBar: MatSnackBar,
    private readonly _cookieService: NgcCookieConsentService,
    private readonly _translocoService: TranslocoService,
    private readonly appService: AppService
  ) {
    this._snackBar.open('🚨 Under Construction 🚨', 'OK', {
      horizontalPosition: this._horizontalPosition,
      verticalPosition: this._verticalPosition,
      duration: 13000,
      politeness: 'assertive'
    });

    this._translocoService.selectTranslate('header.imprint')
      .subscribe(value =>   console.log(value));

    this._translocoService.langChanges$.subscribe((lang: string) => {

    });

    this._translocoService.load('en').subscribe(console.log);

    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      const mediaQueryListDark: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
      const scheme: 'dark' | 'light' = mediaQueryListDark.matches ? 'dark' : 'light';

      if(scheme === 'dark') {
        this.appService.setThemeMode(true);
      }

      mediaQueryListDark
        .addEventListener('change',({ matches }: Record<'matches', boolean>): void => {
          if (matches) {
            this.appService.setThemeMode(true);
          } else {
            this.appService.setThemeMode(false);
          }
        })
    } else {
      this.appService.setThemeMode(false);
    }
  }

  ngOnInit(): void {
    const mediaQueryList: MediaQueryList = this._mediaMatcher.matchMedia(Breakpoints.Tablet);
    console.log(mediaQueryList);

    // subscribe to cookieconsent observables to react to main events
    this._subscriptions.push(this._cookieService.popupOpen$.subscribe(
    (res) => {
      // you can use this.cookieService.getConfig() to do stuff...
      console.log('popupOpen$', res);
    }));

    this._subscriptions.push(this._cookieService.popupClose$.subscribe((res) => {
      // you can use this.cookieService.getConfig() to do stuff...
      console.log('popupClose$', res);
    }));

    this._subscriptions.push(this._cookieService.initializing$.subscribe((event: NgcInitializingEvent) => {
      // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
      console.log(`initializing$: `, `${JSON.stringify(event)}`);
    }));

    this._subscriptions.push(this._cookieService.initialized$.subscribe((res) => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        console.log(`initialized$: `, `${JSON.stringify(event)}`);
      }));

    this._subscriptions.push(this._cookieService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        // the cookieconsent has failed to initialize...
        console.log(`initializationError$: ${JSON.stringify(event.error?.message)}`);
      }));

    this._subscriptions.push(this._cookieService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.cookieService.getConfig() to do stuff...
        console.log(`statusChange$: `, `${JSON.stringify(event)}`);
      }));

    this._subscriptions.push(this._cookieService.revokeChoice$.subscribe(
      (res) => {
        // you can use this.cookieService.getConfig() to do stuff...
        console.log(`revokeChoice$: `, res);
      }));

    this._subscriptions.push( this._cookieService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.cookieService.getConfig() to do stuff...
        console.log(`noCookieLaw$: `, event);
      }));
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  protected footerContentChanged(event: MutationRecord[]): void {
    console.log(event[0]);
  }

  protected mainContentChanged(event: MutationRecord[]): void {
    console.log(event[0]);
  }

  protected headerContentChanged(event: MutationRecord[]): void {
    console.log(event[0]);
  }
}
