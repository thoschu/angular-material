import { Component, isDevMode } from '@angular/core';
import { NgOptimizedImage, NgStyle, UpperCasePipe } from '@angular/common';
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { RouterOutlet } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatMenuItem } from '@angular/material/menu';
import { TranslocoDirective } from '@jsverse/transloco';

import { AppService } from '../app.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatGridList, MatTabGroup, MatGridTile,
    RouterOutlet, NgOptimizedImage, MatTooltip,
    UpperCasePipe, MatIcon, MatMenuItem,
    TranslocoDirective, NgStyle
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  exportAs: 'appMain'
})
export class MainComponent {
  private readonly _images: string[] = [
    'googlehome', 'amazonaws', 'angular', 'ansible', 'docker', 'assemblyscript', 'atlassian', 'auth0', 'css3', 'cucumber',
    'deno', 'dependabot', 'directus', 'duckduckgo', 'electron', 'eslint', 'esbuild', 'express', 'git', 'less', 'meteor', 'mocha',
    'typescript', 'github', 'githubcopilot', 'gitlab', 'google', 'googlechrome', 'grafana', 'gulp', 'harbor', 'chai',
    'helm', 'htmx', 'html5', 'jaeger', 'javascript', 'jasmine', 'jenkins', 'jest', 'jfrog', 'jquery', 'jss', 'dotenv', 'chartdotjs'
  ];
  protected routerOutletGridListRowHeight: number = 600;
  protected routerOutletGridListHeight: string = `${this.routerOutletGridListRowHeight}px`;
  protected readonly images: string[] = this.fisherYatesShuffleArray<string>(this._images);

  constructor(protected readonly appService: AppService) {
    appService.breakpointsLandscape$.subscribe((res: Record<string, string>): void => {
      // if(isDevMode()) console.log('Landscape$', res);
    });

    appService.breakpointsPortrait$.subscribe((res: Record<string, string>): void => {
      // if(isDevMode()) console.log('Portrait$', res);
    });

    const test = {
      count: 1,
      increment(): number {
        return this.count++;
      }
    }
  }

  protected onActivate(event: Component): void {
    const componentName: string = event.constructor.name;
    // if(isDevMode()) console.log(componentName);
  }

  private fisherYatesShuffleArray<T>(array: T[]): T[] {
    let shuffledArray: T[] = array.slice();

    for (let i: number = shuffledArray.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }
}
