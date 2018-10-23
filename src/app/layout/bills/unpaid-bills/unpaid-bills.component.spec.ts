import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidBillsComponent } from './unpaid-bills.component';

describe('UnpaidBillsComponent', () => {
  let component: UnpaidBillsComponent;
  let fixture: ComponentFixture<UnpaidBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
