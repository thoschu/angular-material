import {APP_INITIALIZER, Component, ElementRef, inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { CdkObserveContent } from '@angular/cdk/observers';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import {from, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainComponent, FooterComponent, CdkObserveContent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected readonly title: string = 'Tom S.';
  protected readonly app_init: readonly (() => (Observable<boolean> | Promise<boolean> | void))[] = inject<readonly (() => (Observable<boolean> | Promise<boolean> | void))[]>(APP_INITIALIZER);
  protected overlay$: Observable<() => void | Observable<boolean> | Promise<boolean>> =  from<readonly (() => (Observable<boolean> | Promise<boolean> | void))[]>(this.app_init);
  private unListener?: () => void;

  @ViewChild('overlay')
  private overlay?: ElementRef<HTMLDivElement>;

  @ViewChild('overlay')
  private set overlay2(element: ElementRef<HTMLDivElement>) {
    this.overlay$.subscribe(async (overlay: () => (void | Observable<boolean> | Promise<boolean>)): Promise<void> => {
      const result: boolean | void | Observable<boolean> = await overlay();

      if(result) {
        this.renderer2.setStyle(element.nativeElement, 'opacity', '0');

        this.unListener = this.renderer2.listen(element.nativeElement, 'transitionend', (event: TransitionEvent): void => {
          if(event) {
            this.renderer2.setStyle(element.nativeElement, 'display', 'none');
          }
        });
      }
    });
  };

  constructor(private readonly mediaMatcher: MediaMatcher, private readonly renderer2: Renderer2) {}

  ngOnInit(): void {
    const mediaQueryList: MediaQueryList = this.mediaMatcher.matchMedia(Breakpoints.Tablet);
    console.log(mediaQueryList);
  }

  ngOnDestroy(): void {
    if(this.unListener) {
      this.unListener();
    }
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
