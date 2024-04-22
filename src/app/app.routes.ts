import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';

import { TechnologyComponent } from './technology/technology.component';
import { HomeComponent } from './home/home.component';
import { technologyGuard } from './technology/technology.guard';
import { imprintResolver } from './imprint/imprint.resolver';
import { technologyResolver } from './technology/technology.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'imprint',
    loadComponent: () => import('./imprint/imprint.component').then(c => c.ImprintComponent),
    providers: [
      provideTranslocoScope('imprint')
    ],
    resolve: {
      imprint: imprintResolver
    }
  },
  {
    path: 'technology',
    component: TechnologyComponent,
    canActivate: [technologyGuard],
    resolve: {
      technologyKrypto: technologyResolver
    }
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
