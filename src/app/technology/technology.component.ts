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
  selector: 'app-technology',
  standalone: true,
  imports: [
    NgOptimizedImage, MatTabGroup, MatTab, MatIcon, MatTabLabel,
    HighlightModule, HighlightLineNumbers,
    MatAccordion,
    MatExpansionModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, MatTooltip, MatDivider
  ],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss'
})
export class TechnologyComponent implements AfterViewInit {
  protected readonly code: string  = ` protected async ngAfterViewInit(): Promise<void> {
   console.log('Under Construction');
 };`;

  protected readonly codeBadDIP: string  = `${this.code}`;
  protected readonly codeGoodDIP: string  = `${this.code}`;

  protected readonly codeBadISP: string  = ` interface Worker {
    workOnTask(): void;
    takeBreak(): boolean;
    attendMeeting(): void;
  }

  class Developer implements Worker {
    public workOnTask(): void {
      console.log("Developing software");
    }

    public takeBreak(): boolean {
      console.log("Taking a short break");
      return true;
    }

    public attendMeeting(): void {
      console.log("Attending a code review meeting");
    }
  }

  class Robot implements Worker {
    workOnTask() {
      console.log("Assembling parts");
    }

    takeBreak() {
      // Robots don't take breaks but must implement this method
      console.log("Break not applicable");
    }

    attendMeeting() {
      // Robots don't attend meetings but must implement this method
      console.log("Meeting not applicable");
    }
  }`;
  protected readonly codeGoodISP: string  = `interface TaskWorker {
  workOnTask(): void;
}

interface HumanWorker {
  takeBreak(): void;
  attendMeeting(): void;
}

class Developer implements TaskWorker, HumanWorker {
  workOnTask() {
    console.log("Developing software");
  }

  takeBreak() {
    console.log("Taking a short break");
  }

  attendMeeting() {
    console.log("Attending a code review meeting");
  }
}

class Robot implements TaskWorker {
  workOnTask() {
    console.log("Assembling parts");
  }
}`;

  protected readonly codeBadLSP: string  = `${this.code}`;
  protected readonly codeGoodLSP: string  = `${this.code}`;

  protected readonly codeBadOCP: string  = `${this.code}`;
  protected readonly codeGoodOCP: string  = `${this.code}`;
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
