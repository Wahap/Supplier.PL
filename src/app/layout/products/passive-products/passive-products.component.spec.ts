import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassiveProductsComponent } from './passive-products.component';

describe('PassiveProductsComponent', () => {
  let component: PassiveProductsComponent;
  let fixture: ComponentFixture<PassiveProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassiveProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassiveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
