import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoFilterMyListComponent } from './cargo-filter-my-list.component';

describe('CargoFilterMyListComponent', () => {
  let component: CargoFilterMyListComponent;
  let fixture: ComponentFixture<CargoFilterMyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoFilterMyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoFilterMyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
