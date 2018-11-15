import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCustomersReportComponent } from './top-customers-report.component';

describe('TopCustomersReportComponent', () => {
  let component: TopCustomersReportComponent;
  let fixture: ComponentFixture<TopCustomersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCustomersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCustomersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
