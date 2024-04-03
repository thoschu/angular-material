import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { RouterOutlet } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { head, keys } from 'ramda';

import { AppService } from '../app.service';

@Component({
  selector: 'app-main',
  standalone: true,
    imports: [
        MatGridList, MatTabGroup, MatGridTile,
        RouterOutlet, NgOptimizedImage
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  exportAs: 'appMain'
})
export class MainComponent {
  protected routerOutletGridListRowHeight: number = 0;
  protected readonly images: string[] = [
    'googlehome', 'amazonaws', 'angular', 'ansible', 'docker', 'assemblyscript', 'atlassian', 'auth0', 'css3', 'cucumber',
    'deno', 'dependabot', 'directus', 'duckduckgo', 'electron', 'eslint', 'esbuild', 'express', 'git', 'less', 'meteor', 'mocha',
    'typescript', 'github', 'githubcopilot', 'gitla', 'google', 'googlechrome', 'grafana', 'gulp', 'harbor',
    'helm', 'htmx', 'html5', 'jaeger', 'javascript', 'jasmine', 'jenkins', 'jest', 'jfrog', 'jquery', 'jss'
  ];

  constructor(protected readonly appService: AppService) {
    appService.breakpointsLandscape$.subscribe((res: Record<string, string>): void => {
      switch(head(keys(res))) {
        case 'Breakpoints.XSmall': {
          this.routerOutletGridListRowHeight = 200;
          break;
        }
        case 'Breakpoints.Small': {
          this.routerOutletGridListRowHeight = 580;
          break;
        }
        case 'Breakpoints.Medium': {
          this.routerOutletGridListRowHeight = 560;
          break;
        }
        case 'Breakpoints.Large':
        case 'Breakpoints.XLarge':
        default: {
          this.routerOutletGridListRowHeight = 630;
          break;
        }
      }
    });

    appService.breakpointsPortrait$.subscribe((res: Record<string, string>): void => {
      switch(head(keys(res))) {
        case 'Breakpoints.XSmall': {
          this.routerOutletGridListRowHeight = 1370;
          break;
        }
        case 'Breakpoints.Small': {
          this.routerOutletGridListRowHeight = 770;
          break;
        }
        case 'Breakpoints.Medium': {
          this.routerOutletGridListRowHeight = 600;
          break;
        }
        case 'Breakpoints.Large':
        case 'Breakpoints.XLarge':
        default: {
          this.routerOutletGridListRowHeight = 750;
          break;
        }
      }
    });

    const test = {
      count: 1,
      increment(): number {
        return this.count++;
      }
    }
  }
}
