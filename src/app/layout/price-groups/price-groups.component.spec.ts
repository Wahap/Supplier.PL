import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceGroupsComponent } from './price-groups.component';

describe('PriceGroupsComponent', () => {
  let component: PriceGroupsComponent;
  let fixture: ComponentFixture<PriceGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
