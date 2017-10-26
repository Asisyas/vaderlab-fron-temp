import {Component, Input, OnInit, ViewChild, Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Cargo} from '../../../model/logistic/cargo/cargo';
import {LOAD_TYPE} from '../../../enum/logistic/load-type';
import {TRANSPORT_TYPE} from '../../../enum/logistic/transport-type';
import PlaceResult = google.maps.places.PlaceResult;
import {LatLng} from '../../../model/logistic/cargo/LatLng';
import {CargoService} from '../../../service/logictic/cargo/cargo.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

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
  private _errors: object;
  public date_now: Date;

  @ViewChild('geocoder_arrival_input') arrival_place_component;

  @ViewChild('geocoder_departure_input') departure_place_component;

  constructor(
    public dialogRef: MatDialogRef<CargoCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cargo_service: CargoService) {
    this.date_now = new Date();
  }

  protected static _updateposition(place: PlaceResult) {
    if (!place || !place.geometry) {
      return null;
    }

    return {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
  }

  cancelCreation(evt: Event): void {
    evt.preventDefault();

    this.dialogRef.close(null);
  }

  onSubmit(f: NgForm) {
    this.updatePosition();
    this.updateExternalData();
    console.log(this.cargo);

    this.cargo_service.create(this.cargo)
      .then(cargo => this.dialogRef.close(cargo))
      .catch(error => {});
  }

  protected updateExternalData() {
    this.cargo.external_data['position_arrival'] = {};
    this.cargo.external_data['position_departure'] = {};
  }

  protected updatePosition() {
    this.cargo.arrival_coordinates = CargoCreateComponent._updateposition(this.arrival_place_component.position);
    this.cargo.departure_coordinates = CargoCreateComponent._updateposition(this.departure_place_component.position);
  }

  ngOnInit() {
    if (null == this.cargo) {
      this.cargo = new Cargo();
    }
  }
}
