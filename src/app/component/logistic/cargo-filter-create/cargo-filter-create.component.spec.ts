import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoFilterCreateComponent } from './cargo-filter-create.component';

describe('CargoFilterCreateComponent', () => {
  let component: CargoFilterCreateComponent;
  let fixture: ComponentFixture<CargoFilterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoFilterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoFilterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
