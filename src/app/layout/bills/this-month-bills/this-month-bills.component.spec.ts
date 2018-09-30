import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisMonthBillsComponent } from './this-month-bills.component';

describe('ThisMonthBillsComponent', () => {
  let component: ThisMonthBillsComponent;
  let fixture: ComponentFixture<ThisMonthBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisMonthBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisMonthBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
