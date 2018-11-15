import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWareHouseComponent } from './save-ware-house.component';

describe('SaveWareHouseComponent', () => {
  let component: SaveWareHouseComponent;
  let fixture: ComponentFixture<SaveWareHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveWareHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveWareHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
