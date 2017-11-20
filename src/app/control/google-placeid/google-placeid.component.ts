import {Component, Input, OnInit} from '@angular/core';
import {GeocoderService} from '../../service/google/geocoder/geocoder.service';
import { LowerCasePipe } from '@angular/common';


@Component({
  selector: 'app-google-placeid',
  templateUrl: './google-placeid.component.html',
  styleUrls: ['./google-placeid.component.css']
})
export class GooglePlaceidComponent implements OnInit {


  protected addressData = {};

  public _place: any = [];

  public _viewItems: string[];

  public _visibleData: object;

  public _tooltipValue: string[] = [];

  constructor(private geocoder: GeocoderService) {
    this.viewItems = [
      'country', 'region', 'city'
    ];
  }

  ngOnInit() {
  }

  @Input()
  public set viewItems(items: string[]) {
    this._viewItems = items;
  }

  /**
   * @returns {string[]}
   */
  public get viewItems(): string[] {
    return this._viewItems;
  }

  public get tooltipValue(): string {
    return this._tooltipValue.join(', ');
  }


  public get visibleItems() {

    if (this._visibleData) {
      return this._visibleData;
    }

    const data = {};

    for (const i of this.viewItems) {
      data[i] = i;
    }

    return this._visibleData = data;
  }

  @Input()
  public set placeId(place_id) {
    this.geocoder.geocodePlaceId(place_id).then(place => {
      this.place = place;
    });
  }

  @Input()
  public set place(place: any) {
    this._tooltipValue = [];
    this.addressData = {};

    for (const pos of place['address_components']) {
      if (this.isCity(pos)) {
        this._tooltipValue.push(pos.long_name);
        this.addressData['city'] = pos;
      }

      if (this.isCountry(pos)) {
        this._tooltipValue.push(pos.long_name);
        this.addressData['country'] = pos;
      }

      if (this.isRegion(pos)) {
        this._tooltipValue.push(pos.long_name);
        this.addressData['region'] = pos;
      }
    }

    this._place = place;
  }

  public get place() {
    return this._place;
  }

  isCity(data: object) {
    return this.inArray(data, 'locality');
  }

  isCountryFlag(data: object) {
    return this.inArray(data, 'country');
  }

  isCountryShort(data: object) {
    return this.inArray(data, 'country');
  }

  isCountry(data: object) {
    return this.inArray(data, 'country');
  }

  isRegion(data: object): boolean {
    return this.inArray(data, 'administrative_area_level_1');
  }

  protected inArray(data, key: string): boolean {
    return data['types'].indexOf(key) !== -1;
  }
}
