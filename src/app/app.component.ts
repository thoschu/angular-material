import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import {MatDivider} from "@angular/material/divider";
import {MatAnchor, MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSliderModule, MatDivider, MatAnchor, MatButton, MatIcon, MatIconButton, MatFabButton, MatMiniFabButton, MatRipple, MatFormFieldModule, MatInput],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title: string = 'Tom S.';
  value = 0;
  constructor() {
    console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)
  }
}
