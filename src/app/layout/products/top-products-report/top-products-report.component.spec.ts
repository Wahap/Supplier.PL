import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProductsReportComponent } from './top-products-report.component';

describe('TopProductsReportComponent', () => {
  let component: TopProductsReportComponent;
  let fixture: ComponentFixture<TopProductsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopProductsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopProductsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
