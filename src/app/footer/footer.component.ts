import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AsyncPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatAnchor } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { Store } from '@ngrx/store';

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import proj4 from 'proj4';
import { ScaleLine } from 'ol/control.js';
import { fromLonLat } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';
import { Observable } from 'rxjs';
import { prop } from 'ramda';

import { FooterState } from './store/footer.reducers';
import { initAction, setTownAction, setTownHamburgAction, FooterActions } from './store/footer.actions';
import { selectorsFooter, selectorsFooterTownUpperCase, selectorsFooterYear } from './store/footer.selectors';
import { AppService } from '../app.service';
import {AppState} from "../app.store";

type FooterIcons = Record<'id', number> & Record<'href' | 'matTooltip' | 'src', string>;

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridList, MatGridTile,
    NgClass, NgOptimizedImage,
    MatTooltipModule, MatIcon, MatAnchor, TranslocoDirective
  ],
  providers: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  private map?: Map;
  private simpleIconsCdn: string = '//cdn.simpleicons.org/';
  protected year$: Observable<number>;
  protected town$: Observable<string>;
  protected firstFooterArea: number[] = [2, 2, 2, 2, 2];
  protected lastFooterArea: (string | number)[] = [2, 1];
  protected lastFooterRowHeight: string = '100px';
  protected readonly iconsList: FooterIcons[] = [
    {
      id: 1,
      href: '//github.com/thoschu',
      matTooltip: 'www.github.com',
      src: `${this.simpleIconsCdn}github`
    }, {
      id: 2,
      href: '//www.npmjs.com/~thoschu',
      matTooltip: 'www.npmjs.com',
      src: `${this.simpleIconsCdn}npm`
    }, {
      id: 3,
      href: '//hub.docker.com/u/thoschu',
      matTooltip: 'hub.docker.com',
      src: `${this.simpleIconsCdn}docker`
    }, {
      id: 4,
      href: '//www.youtube.com/channel/UCPmHCApqPmpKrpNRf-0MpdQ',
      matTooltip: 'www.youtube.de',
      src: `${this.simpleIconsCdn}youtube`
    }, {
      id: 5,
      href: '//www.thomas-schulte.de/start.html',
      matTooltip: 'www.thomas-schulte.de',
      src: `${this.simpleIconsCdn}googlehome/white`
    }, {
      id: 6,
      href: '//www.linkedin.com/in/thomas-l-schulte-3988a078/',
      matTooltip: 'www.linkedin.com',
      src: `${this.simpleIconsCdn}linkedin`
    }
  ];

  constructor(
    protected readonly store: Store<AppState>,
    protected readonly appService: AppService,
    private readonly domSanitizer: DomSanitizer,
    private readonly matIconRegistry: MatIconRegistry,
  ) {
    // this.store.subscribe(console.log);
    // const footerStore$: Observable<FooterState> = this.store.select('footer');
    const footerStore$: Observable<FooterState> = this.store.select(selectorsFooter);

    this.year$ = this.store.select(selectorsFooterYear);
    // this.year$ = footerStore$.pipe(map((state: FooterState) => state.year));
    // this.year$ = this.store.select<number>((state: Record<'footer', FooterState>): number => {
    //   return state.footer.year;
    // });
    // this.town$ = footerStore$.pipe(map((state: FooterState) => state.town));
    this.town$ = this.store.select(selectorsFooterTownUpperCase);

    this.store.dispatch({type: '[Footer Page] Set Hamburg'});
    //this.store.dispatch(setTownHamburgAction());

    setTimeout((that: FooterComponent): void => {
      that.store.dispatch(FooterActions.setTownAction({ town: 'Hamburg' }));
    }, 5000, this);

    // this.store.dispatch(initAction());

    proj4.defs(
      'Indiana-East',
      'PROJCS["IN83-EF",GEOGCS["LL83",DATUM["NAD83",' +
      'SPHEROID["GRS1980",6378137.000,298.25722210]],PRIMEM["Greenwich",0],' +
      'UNIT["Degree",0.017453292519943295]],PROJECTION["Transverse_Mercator"],' +
      'PARAMETER["false_easting",328083.333],' +
      'PARAMETER["false_northing",820208.333],' +
      'PARAMETER["scale_factor",0.999966666667],' +
      'PARAMETER["central_meridian",-85.66666666666670],' +
      'PARAMETER["latitude_of_origin",37.50000000000000],' +
      'UNIT["Foot_US",0.30480060960122]]',
    );
    register(proj4);

    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/github.svg')
    );
  }

  ngOnInit(): void {
    this.map = new Map({
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([9.993682, 53.551086]),
        zoom: 10,
        minZoom: 7,
        multiWorld: true
      })
    });

    this.map.addControl(new ScaleLine({ units: 'imperial' }));

    this.appService.breakpointsPortrait$.subscribe((res: Record<string, string>): void => {
      const xSmall: string = prop<string, Record<string, string>>('Breakpoints.XSmall', res);
      const small: string = prop<string, Record<string, string>>('Breakpoints.XSmall', res);

      if(xSmall || small) {
        // console.log('breakpointsPortrait$');
        this.lastFooterArea = [1, 6];
        this.lastFooterRowHeight = '30px';
        this.firstFooterArea = [0, 10, 0, 10, 0]
      }
    });
    this.appService.breakpointsLandscape$.subscribe((res: Record<string, string>): void => {
      const xSmall: string = prop<string, Record<string, string>>('Breakpoints.Small', res);
      const small: string = prop<string, Record<string, string>>('Breakpoints.Small', res);

      if(xSmall || small) {
        // console.log('breakpointsLandscape$');
        this.lastFooterArea = [1, 6];
        this.lastFooterRowHeight = '40px';
        this.firstFooterArea = [0, 10, 0, 10, 0]
      }
    });
  }
}

