import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpentelemetryComponent } from './opentelemetry.component';

describe('SecondComponent', () => {
  let component: OpentelemetryComponent;
  let fixture: ComponentFixture<OpentelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpentelemetryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpentelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
