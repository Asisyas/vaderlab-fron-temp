import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Cargo} from '../../../model/logistic/cargo/cargo';
import {LOAD_TYPE} from '../../../enum/logistic/load-type';
import {TRANSPORT_TYPE} from '../../../enum/logistic/transport-type';
import PlaceResult = google.maps.places.PlaceResult;
import {LatLng} from '../../../model/logistic/cargo/LatLng';

declare var window;

@Component({
  selector: 'app-cargo-create',
  templateUrl: './cargo-create.component.html',
  styleUrls: ['./cargo-create.component.css']
})
export class CargoCreateComponent implements OnInit {

  @Input()
  public cargo: Cargo;

  public transport_type: object = TRANSPORT_TYPE;
  public load_type: object = LOAD_TYPE;

  @ViewChild('geocoder_arrival_input') arrival_place_component;

  @ViewChild('geocoder_departure_input') departure_place_component;

  constructor() {
  }

  protected static _updateposition(place: PlaceResult) {
    if (!place) {
      return null;
    }

    return {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
  }

  onSubmit(f: NgForm) {
    this.updatePosition();
    this.updateExternalData();
    console.log(this.cargo);
  }

  protected updateExternalData() {



    this.cargo.external_data['position_arrival'] = {};
    this.cargo.external_data['position_departure'] = {};
  }

  protected updatePosition() {

    window.test = this.arrival_place_component.position;

    this.cargo.arrival_position = CargoCreateComponent._updateposition(this.arrival_place_component.position);
    this.cargo.departure_position = CargoCreateComponent._updateposition(this.departure_place_component.position);
  }

  ngOnInit() {
    if (null == this.cargo) {
      this.cargo = new Cargo();
    }
  }
}
