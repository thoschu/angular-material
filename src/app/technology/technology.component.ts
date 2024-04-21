import { AfterViewInit, Component, inject, ViewEncapsulation} from '@angular/core';
import { CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import { Highlight, HighlightAuto, HighlightLoader, HighlightModule } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

import { SolidComponent } from './solid/solid.component';
import {Store} from "@ngrx/store";
import {setTechnologyAction} from "../main/store/main.actions";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [
    NgOptimizedImage, MatTabGroup, MatTab, MatIcon, MatTabLabel,
    HighlightModule, HighlightLineNumbers, MatAccordion,
    MatExpansionModule, CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll, MatTooltip, MatDivider,
    SolidComponent, NgTemplateOutlet
  ],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class TechnologyComponent implements AfterViewInit {
  protected readonly code: string  = ` protected async ngAfterViewInit(): Promise<void> {
   console.log('Under Construction');
 };`;

  protected readonly dipText: string  = `Das Dependency Inversion Principle (DIP), zu Deutsch das Prinzip der Abhängigkeitsumkehr.
    Dieses Prinzip besagt, dass hochrangige Module nicht von niederrangigen Modulen abhängig sein sollten;
    beide sollten von Abstraktionen abhängen. Zudem sollten Abstraktionen nicht von Details abhängen, sondern Details von Abstraktionen.
    Dies fördert eine lose Kopplung und erhöht die Modularität, was die Wartbarkeit und Flexibilität der Software verbessert.`;
  protected readonly codeBadDIP: string  = `${this.code}`;
  protected readonly codeGoodDIP: string  = `${this.code}`;

  protected readonly ispText: string  = `Das Interface Segregation Principle (ISP) in den SOLID-Prinzipien empfiehlt,
    dass Klassen nicht dazu gezwungen werden sollten,
    Schnittstellen zu implementieren, die sie nicht nutzen. Dies führt zu einer klaren Trennung und verhindert,
    dass Klassen überladen werden mit Methoden, die sie nicht verwenden.
    Dies ist besonders wichtig, um die Klarheit und Wartbarkeit des Codes zu erhalten.`;
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

  protected readonly lspText: string  = `Liskov Substitution Principle (LSP) in SOLID ist darauf ausgelegt, sicherzustellen, dass Subklassen ihre Basisklassen ersetzen können,
    ohne die Funktionalität des Programms zu beeinträchtigen. Hier sind zwei Beispiele für TypeScript, die demonstrieren,
    wie das LSP korrekt angewendet und wie es verletzt wird.

    Das Liskovsche Substitutionsprinzip (LSP) ist eines der SOLID-Prinzipien im Software-Engineering, das besagt,
    dass Objekte einer Basisklasse durch Objekte einer davon abgeleiteten Klasse ersetzt werden können,
    ohne dass dies die Korrektheit des Programms beeinträchtigt.`;
  protected readonly codeBadLSP: string  = `${this.code}`;
  protected readonly codeGoodLSP: string  = `${this.code}`;

  protected readonly ocpText: string  = `Das Open-Closed Principle (OCP) ist eines der fünf SOLID-Designprinzipien des Softwareentwurfs, formuliert von Bertrand Meyer und besagt,
    dass Softwareartefakte, respektive Softwareentitäten (wie Klassen, Module, Funktionen usw.) für Erweiterungen offen,
    aber für Modifikationen geschlossen sein sollten.

    Das Ziel ist es, die Notwendigkeit zu minimieren, bestehenden Code zu ändern, wenn die Funktionalität erweitert wird.
    Stattdessen sollten Erweiterungen durch das Hinzufügen von neuen Code erfolgen.
    Das bedeutet mithin, dass das Verhalten einer Entität durch Hinzufügen neuer Code erweitert werden kann,
    ohne den bestehenden Code zu ändern.`;
  protected readonly codeBadOCP: string  = `${this.code}`;
  protected readonly codeGoodOCP: string  = `${this.code}`;

  protected readonly srpText: string  = `Das Single Responsibility Principle (SRP) ist eines der SOLID-Designprinzipien in der Softwareentwicklung und steht für das Prinzip der Einzelverantwortung.
    Es besagt, dass eine Klasse oder ein Modul nur aus einem einzigen Grund geändert werden sollte.
    Dieses Prinzip zielt darauf ab, die Komplexität zu reduzieren, indem sichergestellt wird, dass eine Klasse nur eine Verantwortung hat und diese vollständig kapselt.
    Dies führt zu einem einfacheren Verständnis, leichterer Wartbarkeit und Erweiterbarkeit des Codes.`;
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

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) {}

  async ngAfterViewInit(): Promise<void> {}
}
