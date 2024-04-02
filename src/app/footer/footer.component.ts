import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
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

import { AppService } from '../app.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridList, MatGridTile,
    NgClass, NgOptimizedImage,
    MatTooltipModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  exportAs: 'appFooter'
})
export class FooterComponent implements OnInit {
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
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        projection: 'Indiana-East',
        center: fromLonLat([-85.685, 39.891], 'Indiana-East'),
        zoom: 7,
        extent: transformExtent(
          [-172.54, 23.81, -47.74, 86.46],
          'EPSG:4326',
          'Indiana-East',
        ),
        minZoom: 6,
      }),
    });

    this.map.addControl(new ScaleLine({units: 'us'}));
  }
}
