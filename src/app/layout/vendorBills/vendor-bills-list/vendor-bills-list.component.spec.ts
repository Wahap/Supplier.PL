import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBillsListComponent } from './vendor-bills-list.component';

describe('VendorBillsListComponent', () => {
  let component: VendorBillsListComponent;
  let fixture: ComponentFixture<VendorBillsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBillsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBillsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
