import { Component, inject, OnInit } from '@angular/core';
import {AsyncPipe, JsonPipe, NgOptimizedImage} from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip} from "@angular/material/tooltip";
import { ActivatedRoute } from "@angular/router";
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { TranslocoDirective } from '@jsverse/transloco';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {selectorsMainImprintIp} from "../main/store/main.selectors";

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [
    NgOptimizedImage, ScrollingModule,
    MatTab, MatTabGroup,
    MatTabLabel, MatExpansionModule,
    MatDivider, TranslocoDirective, AsyncPipe, MatTooltip, JsonPipe
  ],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent implements OnInit {
  protected readonly breakpointObserver: BreakpointObserver = inject<BreakpointObserver>(BreakpointObserver);
  protected readonly layoutChanges: Observable<boolean>;
  protected ip$: Observable<Record<string, unknown>>;

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) {
    this.layoutChanges = this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).pipe(map((res: BreakpointState) => res.matches));

    this.ip$ = this.store.select(selectorsMainImprintIp);
  }

  ngOnInit(): void {
    this.layoutChanges.subscribe(console.log);

    console.log(this.route.snapshot.data);
  }
}
