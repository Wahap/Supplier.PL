import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBillReportComponent } from './monthly-bill-report.component';

describe('MonthlyBillReportComponent', () => {
  let component: MonthlyBillReportComponent;
  let fixture: ComponentFixture<MonthlyBillReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyBillReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyBillReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
