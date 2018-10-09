import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThisWeekVendorBillsComponent } from './this-week-vendor-bills.component';

describe('ThisWeekVendorBillsComponent', () => {
  let component: ThisWeekVendorBillsComponent;
  let fixture: ComponentFixture<ThisWeekVendorBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThisWeekVendorBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThisWeekVendorBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
