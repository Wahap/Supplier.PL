import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterReturnBillsComponent } from './filter-return-bills.component';

describe('FilterReturnBillsComponent', () => {
  let component: FilterReturnBillsComponent;
  let fixture: ComponentFixture<FilterReturnBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterReturnBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterReturnBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
