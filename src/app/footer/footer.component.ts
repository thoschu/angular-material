import { Component, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

import { AppService } from '../app.service';
import {AsyncPipe, JsonPipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    AsyncPipe,
    NgClass,
    JsonPipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  exportAs: 'appFooter'
})
export class FooterComponent implements OnInit {
  constructor(protected readonly appService: AppService) {}

  ngOnInit(): void {}
}
