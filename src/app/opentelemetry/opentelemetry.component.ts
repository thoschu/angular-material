import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatCard, MatCardContent} from '@angular/material/card';
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

@Component({
  selector: 'app-opentelemetry',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatCard,
    MatCardContent,
    MatAccordion,
    MatExpansionModule
  ],
  templateUrl: './opentelemetry.component.html',
  styleUrl: './opentelemetry.component.scss'
})
export class OpentelemetryComponent {
  panelOpenState = false;

  constructor() {

  }
}
