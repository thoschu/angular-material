import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormBuilder } from '@angular/forms';
import {MatListItem, MatNavList} from "@angular/material/list";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatSidenavModule, MatToolbarModule, MatIconModule,
    MatIconButton, MatNavList, MatListItem,
    RouterLink, RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title: string = 'Tom S.';
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });


  constructor(private readonly _formBuilder: FormBuilder) {
  }
}
