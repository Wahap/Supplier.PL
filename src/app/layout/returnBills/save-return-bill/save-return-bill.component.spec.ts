import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveReturnBillComponent } from './save-return-bill.component';

describe('SaveReturnBillComponent', () => {
  let component: SaveReturnBillComponent;
  let fixture: ComponentFixture<SaveReturnBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveReturnBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveReturnBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
