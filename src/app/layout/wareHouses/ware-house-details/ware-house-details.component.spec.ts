import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WareHouseDetailsComponent } from './ware-house-details.component';

describe('WareHouseDetailsComponent', () => {
  let component: WareHouseDetailsComponent;
  let fixture: ComponentFixture<WareHouseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WareHouseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WareHouseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
