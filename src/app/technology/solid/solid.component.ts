import { Component, Input, OnInit } from '@angular/core';
import { MatTab, MatTabLabel } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader, MatExpansionPanelTitle
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-solid',
  standalone: true,
  imports: [
    MatTab, MatTooltip, MatTabLabel,
    CdkVirtualScrollViewport, MatExpansionPanel,
    MatExpansionPanelTitle, MatExpansionPanelDescription,
    MatIcon, HighlightAuto, HighlightLineNumbers,
    MatDivider, CdkFixedSizeVirtualScroll, MatExpansionPanelHeader
  ],
  templateUrl: './solid.component.html',
  styleUrl: './solid.component.scss'
})
export class SolidComponent implements OnInit {
  @Input({ required: true }) public title: string = '';
  @Input({ required: true }) public description: string = '';
  @Input({ required: true }) public content: string = '';
  @Input({ required: true }) public badCode: string = '';
  @Input({ required: true }) public goodCode: string = '';

  constructor() {}

  ngOnInit(): void {}
}
