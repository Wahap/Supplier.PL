import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisMonthVendorBillsComponent } from './this-month-vendor-bills.component';

describe('ThisMonthVendorBillsComponent', () => {
  let component: ThisMonthVendorBillsComponent;
  let fixture: ComponentFixture<ThisMonthVendorBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisMonthVendorBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisMonthVendorBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
