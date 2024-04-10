import { AfterViewInit, Component, inject} from '@angular/core';
import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgOptimizedImage } from "@angular/common";
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { Highlight, HighlightAuto, HighlightLoader, HighlightModule } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [
    NgOptimizedImage, MatTabGroup, MatTab, MatIcon, MatTabLabel,
    HighlightModule, HighlightLineNumbers,
    MatAccordion,
    MatExpansionModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, MatTooltip, MatDivider
  ],
  templateUrl: './first.component.html',
  styleUrl: './first.component.scss'
})
export class FirstComponent implements AfterViewInit {
  private hljsLoader: HighlightLoader = inject<HighlightLoader>(HighlightLoader);
  protected readonly code: string  = ` private async ngAfterViewInit(): Promise<void> {};
 private readonly title: string = 'First Component';`;

  protected readonly codeBadSRP: string  = ` class Employee {
    calculateSalary(hours: number, hourlyRate: number) {
      return hours * hourlyRate;
    }

    saveToDatabase(employeeData: any) {
      // Save to database logic
    }

    generateReport(employeeId: number) {
      // Generate report logic
    }
  }`;

  protected readonly codeGoodSRP: string  = ` class Employee {
    calculateSalary(hours: number, hourlyRate: number) {
      return hours * hourlyRate;
    }
  }

  class DatabaseManager {
    saveToDatabase(employeeData: any) {
      // Save to database logic
    }
  }

  class ReportGenerator {
    generateReport(employeeId: number) {
      // Generate report logic
    }
  }`;

  constructor() {}

  async ngAfterViewInit(): Promise<void> {}
}
