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
  selector: 'app-second',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatCard,
    MatCardContent,
    MatAccordion,
    MatExpansionModule
  ],
  templateUrl: './second.component.html',
  styleUrl: './second.component.scss'
})
export class SecondComponent {
  panelOpenState = false;

  constructor() {

  }
}
