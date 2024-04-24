import { Component } from '@angular/core';

import { AsideService } from './aside.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
  providers: [AsideService]
})
export class AsideComponent {
  constructor(protected readonly asideService: AsideService) {
    this.asideService.getBinance().subscribe(console.log);
  }
}
