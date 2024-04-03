import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => new Promise((resolve, reject): void => {

        setTimeout((): void => {
          resolve(true);
        }, 1000);

      }),
      multi: true
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
