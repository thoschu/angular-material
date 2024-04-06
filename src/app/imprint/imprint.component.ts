import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatIcon} from "@angular/material/icon";
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDivider} from "@angular/material/divider";
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ScrollingModule,
    MatIcon,
    MatTab,
    MatTabGroup,
    MatTabLabel,
    MatExpansionModule,
    MatDivider,
    TranslocoDirective
  ],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  panelOpenState = false;
}
