import {Component, Input, OnInit} from '@angular/core';
import {GeocoderService} from '../../service/google/geocoder/geocoder.service';

@Component({
  selector: 'app-google-placeid',
  templateUrl: './google-placeid.component.html',
  styleUrls: ['./google-placeid.component.css']
})
export class GooglePlaceidComponent implements OnInit {

  @Input()
  public place: any = [];

  constructor(private geocoder: GeocoderService) {
    console.log(this);
  }

  ngOnInit() {
  }

  @Input()
  public set placeId(place_id) {
    this.geocoder.geocodePlaceId(place_id).then(place => {
      this.place = place;
      console.log('PLACE', place);
    });
  }

  isCity(data: object){
    return this.inArray(data, 'locality');
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
