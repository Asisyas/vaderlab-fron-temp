import {AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {FormControl} from '@angular/forms';
import { } from 'googlemaps';

@Component({
  selector: 'app-input-geocoder',
  templateUrl: './geocoder.component.html',
  styleUrls: ['./geocoder.component.css']
})
export class GeocoderComponent implements OnInit {

  @Input()
  public placeholder: string;

  private _position: google.maps.places.PlaceResult;

  private _types: string[] = ['address'];

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  @Input()
  set position(place: google.maps.places.PlaceResult) {
    this._position = place;
  }

  get position(): google.maps.places.PlaceResult {
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
          this.position = autocomplete.getPlace();
        });
      });
    });
  }
}
