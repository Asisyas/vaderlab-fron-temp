import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoMyListComponent } from './cargo-my-list.component';

describe('CargoMyListComponent', () => {
  let component: CargoMyListComponent;
  let fixture: ComponentFixture<CargoMyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoMyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoMyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
