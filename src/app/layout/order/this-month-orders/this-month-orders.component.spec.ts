import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisMonthOrdersComponent } from './this-month-orders.component';

describe('ThisMonthOrdersComponent', () => {
  let component: ThisMonthOrdersComponent;
  let fixture: ComponentFixture<ThisMonthOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisMonthOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisMonthOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
