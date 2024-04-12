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
  protected readonly code: string  = ` private async ngAfterViewInit(): Promise<void> {};
    private readonly title: string = 'First Component';`;

  private readonly foo: unknown = '';

  protected readonly codeBadSRP: string  = ` class Employee {
    public readonly employeeId: number;

    constructor(id: number) {
      this.employeeId = id;
    }

    public calculateSalary(hours: number, hourlyRate: number): number {
      return hours * hourlyRate;
    }

    public saveToDatabase(employeeData: any): void {
      // Save to database logic
    }

    public generateReport(employeeId: number = this.employeeId): unknown {
      // Generate report logic
    }
  }

  const employee: Employee = new Employee(325);
  const salary: number = employee.calculateSalary(160, 55);

  employee.saveToDatabase(salary);

  // [...]

  `;

  protected readonly codeGoodSRP: string  = ` class Employee {
    public readonly employeeId: number;

    constructor(id: number) {
      this.employeeId = id;
    }

    public calculateSalary(hours: number, hourlyRate: number): number {
      return hours * hourlyRate;
    }
  }

  class DatabaseManager {
    public saveToDatabase(employeeData: any): void {
      // Save to database logic
    }
  }

  class ReportGenerator {
    public generateReport(employeeId: number): unknown {
      // Generate report logic
    }
  }


  const employee: Employee = new Employee(325);
  const salary: number = employee.calculateSalary(160, 55);

  const databaseManager: DatabaseManager = new DatabaseManager();
  databaseManager.saveToDatabase(salary);

  const reportGenerator: ReportGenerator = new ReportGenerator();
  reportGenerator.generateReport(employee.employeeId);

  // [...]

  `;

  constructor() {}

  async ngAfterViewInit(): Promise<void> {}
}
