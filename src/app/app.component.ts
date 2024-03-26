import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink, RouterOutlet,
    MatSidenavModule, MatToolbarModule, MatIconModule,
    MatIconButton, MatNavList, MatListItem, MatAnchor, MatMenuTrigger, MatMenu, MatMenuItem,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected readonly title: string = 'Tom S.';
  protected static readonly THUMBUP_ICON: string =
    `
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
            <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
              `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
              `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
        </svg>
    `;

  constructor(private readonly iconRegistry: MatIconRegistry, private readonly sanitizer: DomSanitizer) {
    this.iconRegistry.addSvgIconLiteral('thumbs-up', this.sanitizer.bypassSecurityTrustHtml(AppComponent.THUMBUP_ICON));
  }

  ngOnInit(): void {

  }
}
