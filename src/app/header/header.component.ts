import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, ViewportScroller, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDrawerToggleResult, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

import { Subscription } from 'rxjs';
import { head, keys } from 'ramda';

import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, RouterOutlet,
    MatSidenavModule, MatToolbarModule, MatIconModule,
    MatIconButton, MatNavList, MatListItem, MatAnchor,
    MatMenuTrigger, MatMenu, MatMenuItem, MatGridList,
    RouterLinkActive, MatGridTile, AsyncPipe, NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  exportAs: 'appHeader',
  animations: [
    HeaderComponent.trigger
  ]
})
export class HeaderComponent implements OnDestroy, OnInit {
  private landscapeSubscription?: Subscription;
  private portraitSubscription?: Subscription;
  protected wideScreen: boolean = true;
  protected rowHeightSmallDevice: number = 65;
  protected readonly title: string = 'Tom S.';
  protected static readonly THUMBUP_ICON: string = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.51.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
    </svg>
  `;

  private static trigger: AnimationTriggerMetadata = trigger('fixedStatic', [
    state('fixed', style({
      position: 'fixed',
      top: 0,
      height: '65px',
      'z-index': 10000000,
      background: '#FFFFFF'
    })),
    state('static', style({
      position: 'static',
      background: 'transparent',
      height: '0',
    })),
    transition('fixed => static', [
      animate('.5s')
    ]),
    transition('static => fixed', [
      animate('1s')
    ])
  ])

  isFixedPosition = true;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly iconRegistry: MatIconRegistry,
    protected readonly appService: AppService,
    protected readonly viewportScroller: ViewportScroller
  ) {
    this.iconRegistry.addSvgIconLiteral('thumbs-up', this.sanitizer.bypassSecurityTrustHtml(HeaderComponent.THUMBUP_ICON));
  }

  ngOnDestroy(): void {
    this.landscapeSubscription?.unsubscribe();
    this.portraitSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.landscapeSubscription = this.appService.breakpointsLandscape$.subscribe((landscape: Record<string, string>): void => {
      switch(head<string>(keys<Record<string, string>>(landscape))) {
        case 'Breakpoints.XSmall': {
          this.wideScreen = false;
          break;
        }
        case 'Breakpoints.Small':
        case 'Breakpoints.Medium':
        case 'Breakpoints.Large':
        case 'Breakpoints.XLarge':
        default: {
          this.wideScreen = true;
          break;
        }
      }

    });
    this.portraitSubscription = this.appService.breakpointsPortrait$.subscribe((portrait: Record<string, string>): void => {
      switch(head<string>(keys<Record<string, string>>(portrait))) {
        case 'Breakpoints.XSmall':
        case 'Breakpoints.Small':
        case 'Breakpoints.Medium':
        case 'Breakpoints.Large': {
          this.wideScreen = false;
          break;
        }
        case 'Breakpoints.XLarge':
        default: {
          this.wideScreen = true;
          break;
        }
      }
    });
  }

  protected openSidenav(sidenav: MatSidenav): void {
    sidenav.open().then((res: MatDrawerToggleResult): void =>{
      while(this.rowHeightSmallDevice <= 200 && res === 'open') {
        this.rowHeightSmallDevice++;
      }
    }).catch((): void => {
      this.rowHeightSmallDevice = 200;
    });
  }

  protected closeSidenav(sidenav: MatSidenav): void {
    sidenav.close().then((res: MatDrawerToggleResult): void =>{
      while(this.rowHeightSmallDevice >= 65 && res === 'close') {
        this.rowHeightSmallDevice--;
      }
    }).catch((): void => {
      this.rowHeightSmallDevice = 65;
    });
  }

  @HostListener('window:scroll', [])
  private onScroll(): void {
    const scrollPosition: number = window.scrollY;

    this.isFixedPosition = scrollPosition < 500;
  }
}
