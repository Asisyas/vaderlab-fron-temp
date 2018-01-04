import {Component, Input, OnInit} from '@angular/core';
import {CargoService} from '../../../service/logistic/cargo/cargo.service';
import {Cargo} from '../../../model/logistic/cargo/cargo';
import {Subject} from "rxjs/Subject";
import {SearchService} from "../../../service/logistic/cargo/search.service";

@Component({
  selector: 'app-cargo-search',
  templateUrl: './cargo-search.component.html',
  styleUrls: ['./cargo-search.component.css']
})
export class CargoSearchComponent implements OnInit {

  protected _entities: Cargo[];
  protected __entitiesObservable;

  constructor(private cargo_service: SearchService) {
      this._entities = [];
      this.__entitiesObservable = new Subject();
  }

  public get entities() {
    return this._entities;
  }

  ngOnInit() {
    this.cargo_service.startSearch();
    this._entities = this.cargo_service.entities;
    this.__entitiesObservable = this.cargo_service.entitiesObservable;
  }

}
