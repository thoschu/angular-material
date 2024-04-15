import {animate, AnimationTriggerMetadata, group, state, style, transition, trigger} from '@angular/animations';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {
  AsyncPipe,
  ViewportScroller,
  NgOptimizedImage,
  NgStyle,
  NgClass,
  NgIf,
  UpperCasePipe,
  TitleCasePipe
} from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDrawerToggleResult, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { head, keys } from 'ramda';

import { AppService } from '../app.service';
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink, RouterOutlet,
    MatSidenavModule, MatToolbarModule, MatIconModule,
    MatIconButton, MatNavList, MatListItem, MatAnchor,
    MatMenuTrigger, MatMenu, MatMenuItem, MatGridList,
    RouterLinkActive, MatGridTile, AsyncPipe,
    NgOptimizedImage, TranslocoDirective, MatTooltip, NgStyle,
    NgClass, MatSlideToggle, MatRadioGroup, MatRadioButton, NgIf, MatDivider, UpperCasePipe, TitleCasePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  exportAs: 'appHeader',
  animations: [ HeaderComponent.triggerFixedStatic ]
})
export class HeaderComponent implements OnDestroy, OnInit {
  private landscapeSubscription?: Subscription;
  private portraitSubscription?: Subscription;
  protected isFixedPosition: boolean = true;
  protected wideScreen: boolean = true;
  protected rowHeightSmallDevice: number = 65;
  protected readonly title: string = 'Tom S.';
  protected readonly mainLinks: Array<string> = ['home', 'imprint', 'technology'];
  protected readonly homeLinks: Array<Record<'href' | 'icon', string>> = [
    { href: 'portainer.techstack.ch', icon: 'portainer' },
    { href: 'jenkins.techstack.ch', icon: 'jenkins' },
    { href: 'iam.techstack.ch', icon: 'keycloak' },
    { href: 'analytics.thomas-schulte.de', icon: 'matomo' },
    { href: 'storybook.thomas-schulte.de', icon: 'storybook' }
  ];
  protected readonly themeButtons: Array<string> = ['dark', 'light'];
  protected readonly languageButtons: Array<string> = ['de', 'en'];
  protected readonly otherLinks: Array<Record<'href' | 'icon' | 'text', string>> = [
    {
      href: 'chat.techstack.ch',
      icon: 'chat',
      text: 'WebRTC Chat'
    }, {
      href: 'techstack.ch/snake',
      icon: 'videogame_asset',
      text: 'Game'
    }
  ];
  protected static readonly THUMBUP_ICON: string = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.51.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
    </svg>
  `;

  private static triggerFixedStatic: AnimationTriggerMetadata = trigger('fixedStatic', [
    state('fixed', style({
      position: 'fixed',
      top: 0,
      height: '60px',
      'z-index': 10000000,
      background: '#FFFFFF'
    })),
    state('static', style({
      position: 'static',
      background: 'transparent',
      height: '0'
    })),
    transition('fixed => static', [
      animate('.5s')
    ]),
    transition('static => fixed', [
      animate('1s')
    ])
  ]);

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly iconRegistry: MatIconRegistry,
    protected readonly appService: AppService,
    protected readonly viewportScroller: ViewportScroller,
    protected readonly translocoService: TranslocoService
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

  protected setActiveLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.appService.setItem('lang', lang);
  }

  protected openSidenav(sidenav: MatSidenav): void {
    sidenav.open().then((res: MatDrawerToggleResult): void =>{
      while(this.rowHeightSmallDevice <= 250 && res === 'open') {
        this.rowHeightSmallDevice++;
      }
    }).catch((): void => {
      this.rowHeightSmallDevice = 250;
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

    console.log(scrollPosition < 500);

    this.isFixedPosition = scrollPosition < 500;
  }

  protected toggleTheme(darkMode: boolean, evt: Event): void {
    // evt.stopPropagation();
    this.appService.setThemeMode(darkMode);
  }

  toggleLanguage() {
    console.log();
  }
}
