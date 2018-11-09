import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisMonthBillsChartComponent } from './this-month-bills-chart.component';

describe('ThisMonthBillsChartComponent', () => {
  let component: ThisMonthBillsChartComponent;
  let fixture: ComponentFixture<ThisMonthBillsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisMonthBillsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisMonthBillsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
