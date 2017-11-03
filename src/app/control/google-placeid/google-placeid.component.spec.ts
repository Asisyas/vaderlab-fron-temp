import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglePlaceidComponent } from './google-placeid.component';

describe('GooglePlaceidComponent', () => {
  let component: GooglePlaceidComponent;
  let fixture: ComponentFixture<GooglePlaceidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglePlaceidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePlaceidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
