import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatTabGroup,
    MatTab,
    MatIcon,
    MatTabLabel
  ],
  templateUrl: './first.component.html',
  styleUrl: './first.component.scss'
})
export class FirstComponent {

}
