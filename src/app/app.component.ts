import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { CdkObserveContent } from '@angular/cdk/observers';
import {
  MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, HeaderComponent,
    MainComponent, FooterComponent,
    CdkObserveContent, AsyncPipe,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected readonly title: string = 'Tom S.';
  private readonly _horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private readonly _verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private readonly _mediaMatcher: MediaMatcher,
    private readonly _snackBar: MatSnackBar
  ) {
    this._snackBar.open('🚨 Under Construction 🚨', 'OK', {
      horizontalPosition: this._horizontalPosition,
      verticalPosition: this._verticalPosition,
      duration: 5000,
      politeness: 'assertive'
    });
  }

  ngOnInit(): void {
    const mediaQueryList: MediaQueryList = this._mediaMatcher.matchMedia(Breakpoints.Tablet);
    console.log(mediaQueryList);
  }

  protected footerContentChanged(event: MutationRecord[]): void {
    console.log(event[0]);
  }

  protected mainContentChanged(event: MutationRecord[]): void {
    console.log(event[0]);
  }

  protected headerContentChanged(event: MutationRecord[]): void {
    console.log(event[0]);
  }
}
