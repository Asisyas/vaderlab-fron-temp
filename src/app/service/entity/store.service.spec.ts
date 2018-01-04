
import { StoreService } from './store.service';
import {Cargo} from "../../model/logistic/cargo/cargo";
import {inject, TestBed} from "@angular/core/testing";

describe('StoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService]
    });
  });

  it('should be created', inject([StoreService], (service: StoreService<Cargo>) => {
    expect(service).toBeTruthy();
  }));
});
