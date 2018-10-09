import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBillPrintComponent } from './vendor-bill-print.component';

describe('VendorBillPrintComponent', () => {
  let component: VendorBillPrintComponent;
  let fixture: ComponentFixture<VendorBillPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBillPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
