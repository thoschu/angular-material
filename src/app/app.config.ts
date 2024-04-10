import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NgcCookieConsentConfig, provideNgcCookieConsent } from 'ngx-cookieconsent';
import { provideHighlightOptions } from 'ngx-highlightjs';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';
import { AppService } from './app.service';
import { reducers, metaReducers } from './reducers';

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
          if (lang) {
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
      "type": "info"
    }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideStore(reducers, { metaReducers }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml')
      },
      //themePath: 'path-to-theme.css'
    })
  ]
};
