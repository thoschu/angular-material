import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-second',
  standalone: true,
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './second.component.html',
  styleUrl: './second.component.scss'
})
export class SecondComponent {

}
