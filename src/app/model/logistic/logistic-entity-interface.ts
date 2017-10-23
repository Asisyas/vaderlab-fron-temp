import {LatLng} from './cargo/LatLng';

export interface LogisticEntityInterface {
  id: number;
  permanent: boolean;
  external_data: object;
  arrivalPosition: LatLng;
  departurePosition: LatLng;
}
