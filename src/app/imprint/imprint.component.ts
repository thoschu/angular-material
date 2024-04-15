import { Component, inject, OnInit } from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import { TranslocoDirective } from '@jsverse/transloco';
import {Observable} from "rxjs";

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ScrollingModule,
    MatIcon,
    MatTab,
    MatTabGroup,
    MatTabLabel,
    MatExpansionModule,
    MatDivider,
    TranslocoDirective,
    AsyncPipe
  ],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent implements OnInit {
  protected readonly breakpointObserver: BreakpointObserver = inject<BreakpointObserver>(BreakpointObserver);
  protected readonly layoutChanges: Observable<BreakpointState>;

  constructor() {
    this.layoutChanges = this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]);
  }

  ngOnInit(): void {
    this.layoutChanges.subscribe(console.log);
  }
}
