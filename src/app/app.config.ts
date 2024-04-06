import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { NgcCookieConsentConfig, provideNgcCookieConsent } from 'ngx-cookieconsent';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';
import {AppService} from "./app.service";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (appService: AppService, translocoService: TranslocoService) => {
        const lang: string | null = appService.getItem('lang');

        return () => {
          if(lang) {
            translocoService.setActiveLang(lang);
          }

          return new Promise((resolve, reject) => {
            return setTimeout((): void => {
              return resolve(true);
            }, 1000);
          });
        };
      },
      deps: [AppService, TranslocoService],
    },
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'de'],
        fallbackLang: 'en',
        defaultLang: 'de',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        failedRetries: 1,
        flatten: {
          aot: !isDevMode()
        }
      },
      loader: TranslocoHttpLoader
    }),
    provideNgcCookieConsent({
      "cookie": {
        "domain": "techstack.ch"
      },
      "position": "bottom-left",
      "theme": "classic",
      "palette": {
        "popup": {
          "background": "#5b5b5b",
          "text": "#ffffff",
          "link": "#ffffff"
        },
        "button": {
          "background": "#ababab",
          "text": "#000000",
          "border": "transparent"
        }
      },
      "type": "info",
      "content": {
        "message": "This website uses cookies to ensure you get the best experience on our website.",
        "dismiss": "Got it!",
        "deny": "Refuse cookies",
        "link": "Learn more",
        "href": "https://cookiesandyou.com",
        "policy": "Cookie Policy"
      }
    })
  ]
};
