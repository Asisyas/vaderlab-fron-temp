import {LatLng} from './cargo/LatLng';

export interface LogisticEntityInterface {
  id: number;
  permanent: boolean;
  external_data: object;
  arrival_position: LatLng;
  departure_position: LatLng;
}
