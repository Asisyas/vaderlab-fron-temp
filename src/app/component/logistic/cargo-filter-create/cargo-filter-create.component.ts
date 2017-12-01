import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Filter } from '../../../model/logistic/cargo/filter';
import { PERMANENT_TYPE } from '../../../enum/logistic/permanent-type';
import { MapsAPILoader } from '@agm/core';

declare var L, window;

@Component({
  selector: 'app-cargo-filter-create',
  templateUrl: './cargo-filter-create.component.html',
  styleUrls: ['./cargo-filter-create.component.css']
})
export class CargoFilterCreateComponent implements OnInit {
  date_now: Date = new Date();

  @Input()
  filter: Filter;

  departure_geometry: any;
  arrival_geometry: any;
  map_layer: any;
  map: any;

  protected _permanent_type: number[] = PERMANENT_TYPE;

  constructor(
    public dialogRef: MatDialogRef<CargoFilterCreateComponent>,
    private __mapsAPILoader: MapsAPILoader
    ) {
    this.date_now = new Date('now');
  }

  ngOnInit() {

    this.__mapsAPILoader.load().then(() => {
      this.map = L.map('filter_form_map').setView([1, 1], 2);
      L.gridLayer.googleMutant({
        type: 'roadmap'
      }).addTo(this.map);

      window.map = this.map;

    });

    if (null == this.filter) {
      this.filter = new Filter();
    }
  }

  cancelCreation(evt: Event): void {
    evt.preventDefault();

    this.dialogRef.close(null);
  }

  onSubmit() {
  }

}
