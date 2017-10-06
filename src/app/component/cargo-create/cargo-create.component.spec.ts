import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoCreateComponent } from './cargo-create.component';

describe('CargoCreateComponent', () => {
  let component: CargoCreateComponent;
  let fixture: ComponentFixture<CargoCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
