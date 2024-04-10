import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const applicationRefPromise: Promise<ApplicationRef> = bootstrapApplication(AppComponent, appConfig);

applicationRefPromise
  .then((ref: ApplicationRef): void => console.log('Application booted!', ref))
  .then((): void => {
    if(window.opener !== null) {
      // if(isDevMode()) console.log(window.opener);

      window.opener.location = 'https://www.thomas-schulte.de/musik.html';
    }
  })
  .catch(console.error);
