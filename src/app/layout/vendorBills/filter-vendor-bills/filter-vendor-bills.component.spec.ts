import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterVendorBillsComponent } from './filter-vendor-bills.component';

describe('FilterVendorBillsComponent', () => {
  let component: FilterVendorBillsComponent;
  let fixture: ComponentFixture<FilterVendorBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterVendorBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterVendorBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
