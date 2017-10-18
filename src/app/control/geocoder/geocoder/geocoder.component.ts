import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { environment } from '../../../../environments/environment';

declare var $, GeocoderJS, Bloodhound;

@Component({
  selector: 'app-input-geocoder',
  templateUrl: './geocoder.component.html',
  styleUrls: ['./geocoder.component.css']
})
export class GeocoderComponent implements OnInit, AfterViewInit {

  private geocoder: object;

  @ViewChild('geocoder_input') input: ElementRef;

  @Input()
  private valueSource;

  private isGeocoded = true;

  constructor() {
    this.geocoder = {};

    const geocoders: GeocoderConfig[] = [
      { provider: 'google', apiKey: environment.maps_google_api_key },
      { provider: 'yandex', apiKey: environment.maps_yandex_api_key } ,
      { provider: 'bing', apiKey: environment.maps_bing_api_key },
      { provider: 'mapquest', apiKey: environment.maps_mapquest_api_key },
      { provider: 'openstreetmap', apiKey: '' }
    ];

    for (let i = 0; i < geocoders.length; i++) {
      const tmp = geocoders[i];
      this.geocoder[tmp.provider] = GeocoderJS.createGeocoder(tmp);
    }

  }

  protected getCurrentProvider(): string {
    return 'google';
  }

  ngOnInit() {

    const engine = new Bloodhound({
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: '%QUERY',
        wildcard: '%QUERY',
        filter: function(response) {
          return response;
        },
        transport:  (options, onSuccess, onError) => {
          this.geocoder[this.getCurrentProvider()].geocode(options.url, (data) => {
              done(data, null, null);
          });

          function done(data, textStatus, request) {
            onSuccess(data);
          }

          function fail(request, textStatus, errorThrown) {
            onError(errorThrown);
          }

          function always() {
          }
        }
      }
    });

    $(this.input.nativeElement).typeahead({
      highlight: true,
      minLength: 1,
      hint: true
    }, {
      source: engine,
      displayKey: function(data) {
        console.log(data);

        //const city = data.getCity();
        //const region = data.getRegion();
        //const countryCode  = data.getCountyCode();

        const arr = [
          data.getCity(),
          data.getRegion(),
        ];

        return data.getCountyCode() + ' ' + arr.join(', ');
      },
    });
  }

  ngAfterViewInit() {
  }
}

interface GeocoderConfig {
  provider: string;
  apiKey: string;
}
