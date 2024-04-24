import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { CdkObserveContent } from '@angular/cdk/observers';
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
import { AsideComponent } from './aside/aside.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HeaderComponent, MainComponent, FooterComponent,
    CdkObserveContent, AsyncPipe, LoaderComponent, NgOptimizedImage,
    AsideComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy, OnInit {
  protected readonly title: string = 'Tom S.';
  private readonly _subscriptions: Subscription[] = [];

  constructor(
    private readonly _mediaMatcher: MediaMatcher,
    private readonly _cookieService: NgcCookieConsentService,
    private readonly _translocoService: TranslocoService,
    private readonly appService: AppService
  ) {
    this._translocoService.selectTranslate('cookie.message')
      .subscribe((value) => {
        // console.log(value);
      });

    // this._translocoService.load('en').subscribe(console.log);

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
    // console.log(mediaQueryList);

    // subscribe to cookieconsent observables to react to main events
    this._subscriptions.push(this._cookieService.popupOpen$.subscribe(
    (res) => {
      // you can use this.cookieService.getConfig() to do stuff...
      // console.log('1--------------popupOpen$');
    }));

    this._subscriptions.push(this._cookieService.popupClose$.subscribe(() => {
      // you can use this.cookieService.getConfig() to do stuff...
      // console.log('2--------------popupClose$');
    }));

    this._subscriptions.push(this._cookieService.initializing$.subscribe((event: NgcInitializingEvent) => {
      // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
      // console.log(`3--------------initializing$: `, `${JSON.stringify(event)}`);
    }));

    this._subscriptions.push(this._cookieService.initialized$.subscribe((res) => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        // console.log(`4--------------initialized$: `, `${JSON.stringify(event)}`);
      }));

    this._subscriptions.push(this._cookieService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        // the cookieconsent has failed to initialize...
        // console.log(`5--------------initializationError$: ${JSON.stringify(event.error?.message)}`);
      }));

    this._subscriptions.push(this._cookieService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.cookieService.getConfig() to do stuff...
        // console.log(`6--------------statusChange$: `, `${JSON.stringify(event)}`);
      }));

    this._subscriptions.push(this._cookieService.revokeChoice$.subscribe(
      (res) => {
        // you can use this.cookieService.getConfig() to do stuff...
        // console.log(`7--------------revokeChoice$: `, res);
      }));

    this._subscriptions.push( this._cookieService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.cookieService.getConfig() to do stuff...
        // console.log(`8--------------noCookieLaw$: `, event);
      }));

    this._subscriptions.push(this._translocoService.selectTranslateObject('cookie').subscribe((res) => {
      //this._cookieService.getConfig().content.message = 'thomas';
      this._cookieService.getConfig().content = {
        message: res.message,
        dismiss: res.dismiss,
        deny: res.deny,
        link: res.link,
        href: res.href,
        policy: res.policy
      };

      this._cookieService.destroy();
      this._cookieService.init(this._cookieService.getConfig());
    }));
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  protected footerContentChanged(event: MutationRecord[]): void {
    // console.log(event[0]);
  }

  protected mainContentChanged(event: MutationRecord[]): void {
    // console.log(event[0]);
  }

  protected headerContentChanged(event: MutationRecord[]): void {
    // console.log(event[0]);
  }
}
