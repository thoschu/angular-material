import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormBuilder } from '@angular/forms';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

import { OneComponent } from './one/one.component';
import { TwoComponent } from './two/two.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatSidenavModule, MatToolbarModule, MatIconModule,
    MatIconButton, MatNavList, MatListItem,
    RouterLink, RouterOutlet, MatTabGroup, MatTab, OneComponent, TwoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title: string = 'Tom S.';

  constructor(private readonly _formBuilder: FormBuilder) {}
}
