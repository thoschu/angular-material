import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    RouterOutlet
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  exportAs: 'appMain'
})
export class MainComponent { }
