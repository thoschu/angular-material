import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './first.component.html',
  styleUrl: './first.component.scss'
})
export class FirstComponent {

}
