import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBillsComponent } from './filter-bills.component';

describe('FilterBillsComponent', () => {
  let component: FilterBillsComponent;
  let fixture: ComponentFixture<FilterBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
