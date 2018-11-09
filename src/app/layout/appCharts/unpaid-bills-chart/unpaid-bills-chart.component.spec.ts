import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidBillsChartComponent } from './unpaid-bills-chart.component';

describe('UnpaidBillsChartComponent', () => {
  let component: UnpaidBillsChartComponent;
  let fixture: ComponentFixture<UnpaidBillsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidBillsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidBillsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
