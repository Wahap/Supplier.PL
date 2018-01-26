import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaybillsListComponent } from './waybills-list.component';

describe('WaybillsListComponent', () => {
  let component: WaybillsListComponent;
  let fixture: ComponentFixture<WaybillsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
