import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekOrdersComponent } from './this-week-orders.component';

describe('ThisWeekOrdersComponent', () => {
  let component: ThisWeekOrdersComponent;
  let fixture: ComponentFixture<ThisWeekOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisWeekOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisWeekOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
