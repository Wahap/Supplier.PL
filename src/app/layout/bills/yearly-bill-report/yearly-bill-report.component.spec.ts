import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyBillReportComponent } from './yearly-bill-report.component';

describe('YearlyBillReportComponent', () => {
  let component: YearlyBillReportComponent;
  let fixture: ComponentFixture<YearlyBillReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyBillReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyBillReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
