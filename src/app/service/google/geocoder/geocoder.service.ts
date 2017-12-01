import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

import {SessionService} from '../../core/session.service';


@Injectable()
export class GeocoderService {

  private static readonly PLACE_ID_PREF = 'ggl_plc_id';

  private __promise: Promise<void>;
  private __geocoder: google.maps.Geocoder;


  constructor(
    private __mapsAPILoader: MapsAPILoader,
    private __storageService: SessionService
  ) {

    this.__promise = this.__mapsAPILoader.load().then(() => {
      this.__geocoder = new google.maps.Geocoder;
    });
  }

  protected static _getPlaceKey(key: string): string {
    return GeocoderService.PLACE_ID_PREF + '_' + key;
  }

  public getChchedPlaceById(place_id: string) {
    return this.__storageService.getItem(GeocoderService._getPlaceKey(place_id));
  }

  public cachePlaceId(place_id: string, data): void {
    this.__storageService.setItem(GeocoderService._getPlaceKey(place_id), data);
  }

  public geocodePlaceId(place_id: string): Promise<google.maps.GeocoderResult> {
    return new Promise((resolve, reject) => {
      const cached_place: google.maps.GeocoderResult = this.getChchedPlaceById(place_id);

      if (cached_place) {
        resolve(cached_place);

        return;
      }

      this.__promise.then(() => {
        this.__geocoder.geocode( {'placeId': place_id}, (results, status) => {
          if (!google.maps.GeocoderStatus.OK) {
            reject(status);

            return;
          }

          let data: google.maps.GeocoderResult = null;

          if (results && results.length) {
            data = results[0];
          }

          this.cachePlaceId(place_id, data);

          resolve(this.getChchedPlaceById(place_id));
        });
      });
      });
  }
}
