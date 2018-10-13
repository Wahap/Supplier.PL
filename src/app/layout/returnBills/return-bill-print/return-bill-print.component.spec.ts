import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBillPrintComponent } from './return-bill-print.component';

describe('ReturnBillPrintComponent', () => {
  let component: ReturnBillPrintComponent;
  let fixture: ComponentFixture<ReturnBillPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnBillPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnBillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
