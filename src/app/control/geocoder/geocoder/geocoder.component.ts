import {Component, ElementRef, forwardRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import {GeocoderService} from '../../../service/google/geocoder/geocoder.service';
import {ControlValueAccessor, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';
import {MatFormFieldControl} from "@angular/material";

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

    @Input()
    public formErrors: string;

    @Input()
    public _formControlName: string = null;

    @Input()
    public  _formGroup: FormGroup = null;

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
                this.geocoderService.geocodePlaceId(this.google_id).then((data) => {
                    this.searchElementRef.nativeElement.value = data.formatted_address;
                    this.position = data;
                });
            }
        });
    }

    private propagateChange = (_: any) => { };
    // this is the initial value set to the component
    public writeValue(obj: any) {
        this.google_id = obj;

        console.log('WRITE_VAL', obj);

    }

    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }
    public registerOnTouched() { }

    private onChange(event) {
        this.propagateChange(this.google_id);
    }
}
