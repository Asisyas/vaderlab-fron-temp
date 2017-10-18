import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoSearchComponent } from './cargo-search.component';

describe('CargoSearchComponent', () => {
  let component: CargoSearchComponent;
  let fixture: ComponentFixture<CargoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
