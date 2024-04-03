import {
  APP_INITIALIZER, Component,
  ElementRef, inject,
  OnDestroy, OnInit,
  Renderer2, ViewChild
} from '@angular/core';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit, OnDestroy {
  protected readonly app_init: readonly (() => (Observable<boolean> | Promise<boolean> | void))[] = inject<readonly (() => (Observable<boolean> | Promise<boolean> | void))[]>(APP_INITIALIZER);
  protected overlay$: Observable<() => void | Observable<boolean> | Promise<boolean>> =  from<readonly (() => (Observable<boolean> | Promise<boolean> | void))[]>(this.app_init);
  private unListener?: () => void;

  @ViewChild('overlay')
  private overlay?: ElementRef<HTMLDivElement>;

  constructor(private readonly renderer2: Renderer2) {}

  ngOnInit(): void {
    this.overlay$.subscribe(async (overlay: () => (void | Observable<boolean> | Promise<boolean>)): Promise<void> => {
      const result: boolean | void | Observable<boolean> = await overlay();

      if(result) {
        this.renderer2.setStyle(this.overlay?.nativeElement, 'opacity', '0');

        this.unListener = this.renderer2.listen(this.overlay?.nativeElement, 'transitionend', (event: TransitionEvent): void => {
          if(event) {
            this.renderer2.setStyle(this.overlay?.nativeElement, 'display', 'none');
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if(this.unListener) {
      this.unListener();
    }
  }
}
