import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import {MatDivider} from "@angular/material/divider";
import {MatAnchor, MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSliderModule, MatDivider, MatAnchor, MatButton, MatIcon, MatIconButton, MatFabButton, MatMiniFabButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title: string = 'Tom S.';
  value = 0;
}
