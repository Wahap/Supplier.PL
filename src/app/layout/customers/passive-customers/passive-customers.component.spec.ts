import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveCustomersComponent } from './passive-customers.component';

describe('PassiveCustomersComponent', () => {
  let component: PassiveCustomersComponent;
  let fixture: ComponentFixture<PassiveCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassiveCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
