import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekBillsComponent } from './this-week-bills.component';

describe('ThisWeekBillsComponent', () => {
  let component: ThisWeekBillsComponent;
  let fixture: ComponentFixture<ThisWeekBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisWeekBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisWeekBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
