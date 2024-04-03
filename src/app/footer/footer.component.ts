import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AsyncPipe, NgClass, NgOptimizedImage } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import proj4 from 'proj4';
import { ScaleLine } from 'ol/control.js';
import { fromLonLat, transformExtent } from 'ol/proj.js';
import { register } from 'ol/proj/proj4.js';
import { prop } from 'ramda';

import { AppService } from '../app.service';
import {Layer} from "ol/layer";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridList, MatGridTile,
    NgClass, NgOptimizedImage,
    MatTooltipModule, MatIcon
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  exportAs: 'appFooter'
})
export class FooterComponent implements OnInit {
  protected firstFooterArea: number[] = [2, 2, 2, 2, 2];
  protected lastFooterArea: (string | number)[] = [2, 1, '70px'];
  private map?: Map;
  constructor(
    protected readonly appService: AppService,
    private readonly domSanitizer: DomSanitizer,
    private readonly matIconRegistry: MatIconRegistry
  ) {
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
      "github",
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
        minZoom: 7
      })
    });

    this.map.addControl(new ScaleLine({units: 'imperial'}));

    this.appService.breakpointsPortrait$.subscribe((res: Record<string, string>): void => {
      const xSmall: string = prop<string, Record<string, string>>('Breakpoints.XSmall', res);
      const small: string = prop<string, Record<string, string>>('Breakpoints.XSmall', res);

      if(xSmall || small) {
        console.log('breakpointsPortrait$');
        this.lastFooterArea = [0, 6, '40px'];
        this.firstFooterArea = [0, 10, 0, 10, 0]
      }
    });
    this.appService.breakpointsLandscape$.subscribe((res: Record<string, string>): void => {
      const xSmall: string = prop<string, Record<string, string>>('Breakpoints.Small', res);
      const small: string = prop<string, Record<string, string>>('Breakpoints.Small', res);

      if(xSmall || small) {
        console.log('breakpointsLandscape$');
        this.lastFooterArea = [0, 6, '25px'];
        this.firstFooterArea = [0, 10, 0, 10, 0]
      }
    });
  }
}
