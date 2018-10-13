import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisMonthReturnBillsComponent } from './this-month-return-bills.component';

describe('ThisMonthReturnBillsComponent', () => {
  let component: ThisMonthReturnBillsComponent;
  let fixture: ComponentFixture<ThisMonthReturnBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisMonthReturnBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisMonthReturnBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
