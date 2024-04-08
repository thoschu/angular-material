import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';

import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { HomeComponent } from './home/home.component';

import { ImprintComponent } from './imprint/imprint.component';
// import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //{ path: 'imprint', component: ImprintComponent },
  {
    path: 'imprint',
    loadComponent: () => import('./imprint/imprint.component').then(c => c.ImprintComponent),
    providers: [
      provideTranslocoScope('imprint')
    ]
  },
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
];
