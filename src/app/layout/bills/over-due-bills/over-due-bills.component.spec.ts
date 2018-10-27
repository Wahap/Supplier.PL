import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverDueBillsComponent } from './over-due-bills.component';

describe('OverDueBillsComponent', () => {
  let component: OverDueBillsComponent;
  let fixture: ComponentFixture<OverDueBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverDueBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverDueBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
