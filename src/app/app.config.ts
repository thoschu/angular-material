import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { provideState, provideStore} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NgcCookieConsentConfig, provideNgcCookieConsent } from 'ngx-cookieconsent';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';

import { appReducers, appMetaReducers } from './store';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';
import { AppService } from './app.service';
import { FooterEffects } from './footer/store/footer.effects';
import { HeaderEffects } from './header/store/header.effects';
import { MainEffects } from './main/store/main.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (appService: AppService, translocoService: TranslocoService, httpClient: HttpClient) => {
        const lang: string | null = appService.getItem('lang');
        return () => {
          if (lang) {
              translocoService.setActiveLang(lang);
          }

          return new Promise(async (resolve, reject) => {
            // const firstValue = await firstValueFrom(httpClient.get('http://localhost:3000/api'));
            const firstValue = true;

            return setTimeout((): void => {
              if (firstValue) {
                return resolve(true);
              }
              else {
                return reject(false);
              }
            }, 1000);
          });
        };
      },
      deps: [AppService, TranslocoService, HttpClient],
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
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml')
      },
      //themePath: 'path-to-theme.css'
    }),
    provideStore(appReducers, { runtimeChecks: {}, metaReducers: appMetaReducers }),
    // provideStore({
    //   footer: headerReducers
    // }),
    // provideState({ name: 'footer', reducer: headerReducers }),
    // provideStore({
    //   router: routerReducer,
    // }),
    // provideState({ name: 'router', reducer: routerReducer }),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: true,
      traceLimit: 75
    }),
    provideEffects([HeaderEffects, MainEffects, FooterEffects])
  ]
};
