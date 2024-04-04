import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import {provideTransloco, TranslocoService} from '@jsverse/transloco';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';
import {AppService} from "./app.service";
import {AppComponent} from "./app.component";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (appService: AppService, translocoService: TranslocoService) => {
        const lang: string | null = appService.getItem('lang');
        console.log(lang);
        return () => {
          if(lang) {
            translocoService.setActiveLang(lang);;
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
      },
      loader: TranslocoHttpLoader
    })
  ]
};
