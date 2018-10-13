import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekReturnBillsComponent } from './this-week-return-bills.component';

describe('ThisWeekReturnBillsComponent', () => {
  let component: ThisWeekReturnBillsComponent;
  let fixture: ComponentFixture<ThisWeekReturnBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisWeekReturnBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisWeekReturnBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
