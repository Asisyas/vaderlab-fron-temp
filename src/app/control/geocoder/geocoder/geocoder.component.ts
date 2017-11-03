import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import {GeocoderService} from '../../../service/google/geocoder/geocoder.service';

@Component({
  selector: 'app-input-geocoder',
  templateUrl: './geocoder.component.html',
  styleUrls: ['./geocoder.component.css']
})
export class GeocoderComponent implements OnInit {

  @Input()
  public placeholder: string;

  @Input()
  public required: any;

  @Input()
  public google_id?: string;

  private _position: google.maps.GeocoderResult;

  private _types: string[] = ['address'];

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private geocoderService: GeocoderService
              ) {
  }

  @Input()
  set position(place: google.maps.GeocoderResult) {
    this._position = place;
  }

  get position(): google.maps.GeocoderResult {
    return this._position;
  }

  @Input()
  set types(types: string[]) {
    this._types = types;
  }

  get types(): string[] {
    return this._types;
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: this.types
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.geocoderService.geocodePlaceId(autocomplete.getPlace().place_id)
            .then(data => this.position = data);
        });
      });

      if (this.google_id) {
        this.geocoderService.geocodePlaceId(this.google_id)
          .then((res: google.maps.GeocoderResult) => {
            this.position = res;
          });
      }
    });
  }
}
